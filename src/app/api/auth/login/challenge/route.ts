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
    return NextResponse.json(
      { error: "Սերվերի սխալ: Խնդրում ենք փորձել ավելի ուշ" },
      { status: 500 }
    )
  }
}
