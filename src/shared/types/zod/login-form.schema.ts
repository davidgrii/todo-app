import z from 'zod'

export const registerFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters long' })
    .nonempty({ message: 'First name is required' }),

  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .nonempty({ message: 'Email is required' }),

  phoneNumber: z.string().optional()
})

export const subscribeFormSchema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .nonempty({ message: 'Email is required' })
})
