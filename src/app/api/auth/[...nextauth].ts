import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { connectDB } from '@/lib/db'
import { User } from '@/models/user.model'
import bcrypt from 'bcrypt'

export default NextAuth({
  session: { strategy: 'jwt' },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'your-email@gmail.com'
        },
        password: { label: 'Password', type: 'password' }
      },

      async authorize(credentials) {
        await connectDB()

        const user = await User.findOne({ email: credentials?.email })

        if (!user) {
          throw new Error('Invalid credentials')
        }

        const isPasswordValid = await bcrypt.compare(
          credentials?.password || '',
          user.password
        )

        if (!isPasswordValid) {
          throw new Error('Invalid credentials')
        }

        return { id: user._id, name: user.name, email: user.email }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user

      return token
    },

    async session({ session, token }) {
      session.user = token.user as any

      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET
})
