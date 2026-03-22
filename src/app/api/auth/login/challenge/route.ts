import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import bcrypt from "bcryptjs"
import { z } from "zod"
import { sendLoginOtp } from "@/lib/email"
import { LOGIN_OTP_PREFIX, LOGIN_OTP_TTL_MS } from "@/lib/login-otp"

const challengeSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export async function POST(request: NextRequest) {
  try {
    if (!process.env.DATABASE_URL?.trim()) {
      console.error("login-challenge: DATABASE_URL is not set")
      return NextResponse.json(
        {
          error:
            "Կազմաձևման սխալ։ Կապվեք աջակցության հետ։",
          code: "MISSING_DATABASE_URL",
        },
        { status: 503 }
      )
    }

    const body = await request.json()
    const validated = challengeSchema.safeParse(body)
    if (!validated.success) {
      return NextResponse.json(
        { error: "Անվավեր տվյալներ" },
        { status: 400 }
      )
    }

    const { email, password } = validated.data
    const emailLower = email.toLowerCase()

    const user = await db.user.findUnique({
      where: { email: emailLower },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
        isActive: true,
      },
    })

    if (!user || !user.password) {
      return NextResponse.json(
        { error: "Սխալ email կամ գաղտնաբառ" },
        { status: 401 }
      )
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Սխալ email կամ գաղտնաբառ" },
        { status: 401 }
      )
    }

    if (!user.isActive) {
      return NextResponse.json(
        { error: "Խնդրում ենք հաստատել ձեր email հասցեն" },
        { status: 403 }
      )
    }

    const identifier = `${LOGIN_OTP_PREFIX}${emailLower}`
    await db.verificationToken.deleteMany({
      where: { identifier },
    })

    const code = Math.floor(100000 + Math.random() * 900000).toString()
    const expires = new Date(Date.now() + LOGIN_OTP_TTL_MS)

    await db.verificationToken.create({
      data: {
        identifier,
        token: code,
        expires,
      },
    })

    await sendLoginOtp(user.email, code, user.name)

    if (process.env.NODE_ENV === "development") {
      console.log("📧 Login OTP for", user.email, ":", code)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Login challenge error:", error)
    // #region agent log
    const err = error instanceof Error ? error : new Error(String(error))
    const prismaCode =
      typeof error === "object" && error !== null && "code" in error
        ? String((error as { code: unknown }).code)
        : undefined
    fetch("http://127.0.0.1:7564/ingest/a040ba94-020c-4f8d-8973-1fa802992b59", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Debug-Session-Id": "bfb8ad",
      },
      body: JSON.stringify({
        sessionId: "bfb8ad",
        hypothesisId: "H1",
        location: "api/auth/login/challenge/route.ts:catch",
        message: err.message,
        data: {
          name: err.name,
          prismaCode,
        },
        timestamp: Date.now(),
        runId: "post-fix",
      }),
    }).catch(() => {})
    console.error(
      JSON.stringify({
        tag: "login-challenge-debug",
        name: err.name,
        message: err.message,
        prismaCode,
      })
    )
    // #endregion
    const debugAuth =
      process.env.VERCEL_DEBUG_AUTH === "1" ||
      process.env.AUTH_DEBUG_ERROR === "1"
    return NextResponse.json(
      {
        error: "Սերվերի սխալ: Խնդրում ենք փորձել ավելի ուշ",
        errName: err.name,
        ...(prismaCode ? { prismaCode } : {}),
        ...(debugAuth ? { debugMessage: err.message } : {}),
      },
      { status: 500 }
    )
  }
}
