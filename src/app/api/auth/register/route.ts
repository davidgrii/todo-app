import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { User } from '@/models/user.model'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      )
    }

    await connectDB()
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 11)
    const newUser = new User({ name, email, password: hashedPassword })

    await newUser.save()

    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.NEXT_PUBLIC_AUTH_SECRET!,
      { expiresIn: '1h' }
    )

    return NextResponse.json(
      { message: 'User created successfully', token },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
