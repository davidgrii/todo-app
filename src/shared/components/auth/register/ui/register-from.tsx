import React from 'react'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IFormRegister } from '@/shared/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerFormSchema } from '@/shared/types/zod'
import { InputForm } from '@/shared/components/auth/ui/input-form'
import { ButtonForm } from '@/shared/components/auth/ui/button-form'

export const RegisterFrom = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<IFormRegister>({
    resolver: zodResolver(registerFormSchema),
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<IFormRegister> = async (data) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (!res.ok) {
      const errorText = await res.text()

      if (errorText.includes('User already exists')) {
        alert('User already exists. Redirecting to login...')

        return router.push('/login')
      }

      console.error('Server error:', errorText)
      return
    }

    const result = await res.json()

    if (res.ok) {
      alert('Application sent successfully!')

      setTimeout(() => {
        router.push('/todolist')
      }, 300)
    } else {
      alert(`Error sending an application: ${result.error}`)
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={'flex flex-col gap-4 w-full max-w-xl p-6'}
      >
        <InputForm
          type={'name'}
          placeholder={'Your name'}
          register={register}
          errors={errors}
        />

        <InputForm
          type={'email'}
          placeholder={'Your email'}
          register={register}
          errors={errors}
        />

        <InputForm
          type={'password'}
          placeholder={'Your password'}
          register={register}
          errors={errors}
        />

        <span
          onClick={() => router.push('/login')}
          className='text-blue-500 cursor-pointer font-medium'
        >
          Do you have an account? Login
        </span>

        <ButtonForm text={'Register'} isSubmitting={isSubmitting} />
      </form>
    </>
  )
}
