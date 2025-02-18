import React from 'react'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IForm } from '@/shared/types'
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
  } = useForm<IForm>({
    resolver: zodResolver(registerFormSchema),
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<IForm> = async (data) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    const result = await res.json()

    if (res.ok) {
      alert('Application sent successfully!')

      setTimeout(() => {
        router.push('/todo-list')
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

        <ButtonForm isSubmitting={isSubmitting} />
      </form>
    </>
  )
}
