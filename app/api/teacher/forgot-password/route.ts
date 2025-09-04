import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { forgotPasswordSchema } from '@/lib/validators'
import { sendPasswordResetEmail } from '@/lib/email'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validation = forgotPasswordSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    const { email } = validation.data

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email }
    })

    // Always return success to prevent email enumeration
    if (!user) {
      return NextResponse.json(
        { message: 'If an account exists, a reset email has been sent' },
        { status: 200 }
      )
    }

    // Generate reset token
    const token = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

    // Store token in database
    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        token,
        expiresAt
      }
    })

    // Send reset email
    await sendPasswordResetEmail(email, token)

    return NextResponse.json(
      { message: 'If an account exists, a reset email has been sent' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}