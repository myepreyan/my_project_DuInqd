import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { sendVerificationCode } from '@/lib/email'

const registerSchema = z.object({
  name: z.string().min(2, "Անունը պետք է լինի նվազագույնը 2 տառ"),
  email: z.string().email("Սխալ email ֆորմատ"),
  password: z.string()
    .min(8, "Password-ը պետք է լինի նվազագույնը 8 տառ")
    .regex(/[A-ZԱ-Ֆ]/, "Պետք է պարունակի մեծատառ (A-Z կամ Ա-Ֆ)")
    .regex(/[a-zա-ֆ]/, "Պետք է պարունակի փոքրատառ (a-z կամ ա-ֆ)")
    .regex(/[0-9]/, "Պետք է պարունակի թիվ"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password-ները չեն համապատասխանում",
  path: ["confirmPassword"]
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const validated = registerSchema.safeParse(body)
    if (!validated.success) {
      const firstError = validated.error.issues[0]
      return NextResponse.json(
        { error: firstError.message },
        { status: 400 }
      )
    }
    
    const { name, email, password } = validated.data
    
    const existingUser = await db.user.findUnique({
      where: { email: email.toLowerCase() }
    })
    
    if (existingUser) {
      return NextResponse.json(
        { error: "Այս email-ով օգտատեր արդեն գոյություն ունի" },
        { status: 409 }
      )
    }
    
    const hashedPassword = await bcrypt.hash(password, 12)
    
    // Generate 6-digit verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()
    const verificationExpires = new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
    
    const user = await db.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        isActive: false,
      },
      select: {
        id: true,
        email: true,
        name: true,
      }
    })
    
    await db.verificationToken.create({
      data: {
        identifier: user.email,
        token: verificationCode,
        expires: verificationExpires,
      }
    })
    
    await sendVerificationCode(user.email, verificationCode, user.name)
    
    // Development - Log verification code
    if (process.env.NODE_ENV === 'development') {
      console.log('📧 Verification Code for', user.email, ':', verificationCode)
    }
    
    return NextResponse.json({
      success: true,
      message: "Գրանցումը հաջողվեց: Խնդրում ենք ստուգել ձեր email-ը"
    })
    
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: "Սերվերի սխալ: Խնդրում ենք փորձել ավելի ուշ" },
      { status: 500 }
    )
  }
}
