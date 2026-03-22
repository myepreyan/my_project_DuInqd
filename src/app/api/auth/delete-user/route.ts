import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// ADMIN TOOL - Development միայն
export async function DELETE(request: NextRequest) {
  try {
    const { email } = await request.json()
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email պարտադիր է' },
        { status: 400 }
      )
    }

    // Delete verification tokens first (foreign key constraint)
    await db.verificationToken.deleteMany({
      where: { identifier: email.toLowerCase() }
    })

    // Delete user
    const deletedUser = await db.user.delete({
      where: { email: email.toLowerCase() }
    })

    return NextResponse.json({
      success: true,
      message: `${email} - ջնջված է`,
      user: {
        email: deletedUser.email,
        name: deletedUser.name
      }
    })

  } catch (error: any) {
    console.error('Delete error:', error)
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Օգտատերը չի գտնվել' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(
      { error: 'Ջնջումը ձախողվեց' },
      { status: 500 }
    )
  }
}
