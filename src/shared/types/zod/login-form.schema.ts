import z from 'zod'

export const loginFormSchema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .nonempty({ message: 'Email is required' }),

  password: z
    .string()
    .min(11, { message: 'Password must be longer than 11 characters' })
    .nonempty({ message: 'Password is required' })
})
