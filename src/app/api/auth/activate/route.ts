import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// ADMIN TOOL - Ժամանակավոր օգտագործման համար development-ում
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email պարտադիր է' },
        { status: 400 }
      )
    }

    const user = await db.user.findUnique({
      where: { email: email.toLowerCase() }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Օգտատերը չի գտնվել' },
        { status: 404 }
      )
    }

    await db.user.update({
      where: { email: email.toLowerCase() },
      data: {
        isActive: true,
        emailVerified: new Date()
      }
    })

    return NextResponse.json({
      success: true,
      message: `${email} - ակտիվացված է`,
      user: {
        email: user.email,
        name: user.name
      }
    })

  } catch (error) {
    console.error('Activation error:', error)
    return NextResponse.json(
      { error: 'Ակտիվացումը ձախողվեց' },
      { status: 500 }
    )
  }
}
