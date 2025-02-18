import bcrypt from 'bcrypt'
import { NextApiRequest, NextApiResponse } from 'next'
import { connectDB } from '@/back/lib/mongodb'
import { User } from '@/back/models/user.model'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB()

  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  const existingUser = await User.findOne({ email })

  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' })
  }

  const hashedPassword = await bcrypt.hash(password, 11)
  const newUser = new User({ name, email, password: hashedPassword })

  await newUser.save()

  res.status(201).json({ message: 'User created successful' })
}
