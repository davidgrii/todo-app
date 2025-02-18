import React from 'react'
import { Container } from '@/shared/components/ui'
import { RegisterFrom } from '@/shared/components/auth/register/ui/register-from'

export const LayoutRegister = () => {
  return (
    <>
      <Container className={'flex flex-col justify-center items-center'}>
        <h2 className='text-2xl font-bold mb-4'>Registration page</h2>

        <RegisterFrom />
      </Container>
    </>
  )
}
