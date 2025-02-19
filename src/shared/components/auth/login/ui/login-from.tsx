import React from 'react'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IFormLogin } from '@/shared/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginFormSchema } from '@/shared/types/zod'
import { InputForm } from '@/shared/components/auth/ui/input-form'
import { ButtonForm } from '@/shared/components/auth/ui/button-form'

export const LoginFrom = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<IFormLogin>({
    resolver: zodResolver(loginFormSchema),
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<IFormLogin> = async (data) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    const result = await res.json()

    if (res.ok) {
      alert('Login successfully!')

      localStorage.setItem('token', result.token)

      return router.push('/todolist')
    } else {
      alert(`Error login: ${result.error}`)
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={'flex flex-col gap-4 w-full max-w-xl p-6 '}
      >
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
          onClick={() => router.push('/register')}
          className='text-blue-500 font-medium cursor-pointer'
        >
          You don't have an account? Register
        </span>

        <ButtonForm text={'Login'} isSubmitting={isSubmitting} />
      </form>
    </>
  )
}
