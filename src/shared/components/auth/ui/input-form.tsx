import React from 'react'
import { IForm } from '@/shared/types'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { FormErrors } from '@/shared/components/auth/ui/form-errors'

interface IProps {
  type: 'name' | 'email' | 'password'
  placeholder: string
  register: UseFormRegister<IForm>
  errors?: FieldErrors<IForm>
  className?: string
}

export const InputForm: React.FC<IProps> = ({
  type,
  placeholder,
  register,
  errors
}) => {
  return (
    <>
      <div className={'flex flex-col'}>
        <input
          type={type}
          placeholder={placeholder}
          {...register(type)}
          className={'p-3 mb-2.5 border rounded-sm font-medium'}
        />

        <FormErrors message={errors?.[type]?.message} />
      </div>
    </>
  )
}
