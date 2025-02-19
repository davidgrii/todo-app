import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { User } from '@/models/user.model'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      )
    }

    await connectDB()

    const existingUser = await User.findOne({ email })

    if (!existingUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 400 })
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    )

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Incorrect password' },
        { status: 400 }
      )
    }

    const token = jwt.sign(
      { userId: existingUser._id, email: existingUser.email },
      process.env.NEXT_PUBLIC_AUTH_SECRET!,
      { expiresIn: '24h' }
    )

    const res = NextResponse.json(
      { message: 'Login successful', token },
      { status: 200 }
    )

    res.cookies.set('token', token, {
      httpOnly: true,
      secure: false,
      path: '/'
    })

    return res
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
