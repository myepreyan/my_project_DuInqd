import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json()
    
    if (!email || !code) {
      return NextResponse.json(
        { error: 'Email և code պարտադիր են' },
        { status: 400 }
      )
    }

    const verificationToken = await db.verificationToken.findFirst({
      where: {
        identifier: email.toLowerCase(),
        token: code
      }
    })
    
    if (!verificationToken) {
      return NextResponse.json(
        { error: 'Սխալ կոդ' },
        { status: 400 }
      )
    }
    
    if (verificationToken.expires < new Date()) {
      await db.verificationToken.delete({ 
        where: { 
          identifier_token: {
            identifier: email.toLowerCase(),
            token: code
          }
        } 
      })
      return NextResponse.json(
        { error: 'Կոդի ժամկետը լրացել է: Խնդրում ենք նորից ուղարկել' },
        { status: 400 }
      )
    }
    
    await db.user.update({
      where: { email: email.toLowerCase() },
      data: {
        isActive: true,
        emailVerified: new Date()
      }
    })
    
    await db.verificationToken.delete({ 
      where: { 
        identifier_token: {
          identifier: email.toLowerCase(),
          token: code
        }
      } 
    })
    
    return NextResponse.json({
      success: true,
      message: 'Email-ը հաջողությամբ հաստատված է'
    })
    
  } catch (error) {
    console.error('Verification error:', error)
    return NextResponse.json(
      { error: 'Հաստատումը ձախողվեց' },
      { status: 500 }
    )
  }
}
