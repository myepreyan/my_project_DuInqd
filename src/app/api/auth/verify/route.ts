import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const token = searchParams.get('token')
  
  if (!token) {
    return NextResponse.redirect(new URL('/auth/error?error=InvalidToken', request.url))
  }
  
  try {
    const verificationToken = await db.verificationToken.findUnique({
      where: { token }
    })
    
    if (!verificationToken) {
      return NextResponse.redirect(new URL('/auth/error?error=InvalidToken', request.url))
    }
    
    if (verificationToken.expires < new Date()) {
      await db.verificationToken.delete({ where: { token } })
      return NextResponse.redirect(new URL('/auth/error?error=TokenExpired', request.url))
    }
    
    await db.user.update({
      where: { email: verificationToken.identifier },
      data: {
        isActive: true,
        emailVerified: new Date()
      }
    })
    
    await db.verificationToken.delete({ where: { token } })
    
    return NextResponse.redirect(new URL('/login?verified=true', request.url))
    
  } catch (error) {
    console.error('Verification error:', error)
    return NextResponse.redirect(new URL('/auth/error?error=VerificationFailed', request.url))
  }
}
