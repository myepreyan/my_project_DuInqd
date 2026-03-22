import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const token = searchParams.get('token')
  
  if (!token) {
    return NextResponse.json(
      { error: 'Հաստատման հղումը անվավեր է' },
      { status: 400 }
    )
  }
  
  try {
    const verificationToken = await db.verificationToken.findUnique({
      where: { token }
    })
    
    if (!verificationToken) {
      return NextResponse.json(
        { error: 'Հաստատման հղումը անվավեր է կամ արդեն օգտագործված է' },
        { status: 400 }
      )
    }
    
    if (verificationToken.expires < new Date()) {
      await db.verificationToken.delete({ where: { token } })
      return NextResponse.json(
        { error: 'Հաստատման հղումը ժամկետանց է: Խնդրում ենք կրկին գրանցվել' },
        { status: 400 }
      )
    }
    
    await db.user.update({
      where: { email: verificationToken.identifier },
      data: {
        isActive: true,
        emailVerified: new Date()
      }
    })
    
    await db.verificationToken.delete({ where: { token } })
    
    return NextResponse.json({
      success: true,
      message: 'Email-ը հաջողությամբ հաստատված է: Կարող եք մուտք գործել'
    })
    
  } catch (error) {
    console.error('Verification error:', error)
    return NextResponse.json(
      { error: 'Հաստատումը ձախողվեց: Խնդրում ենք փորձել ավելի ուշ' },
      { status: 500 }
    )
  }
}
