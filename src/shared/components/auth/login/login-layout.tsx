import React from 'react'
import { Container } from '@/shared/components/ui'
import { LoginFrom } from '@/shared/components/auth/login/ui/login-from'

export const LoginLayout = () => {
  return (
    <>
      <Container className={'flex flex-col justify-center items-center'}>
        <h2 className='text-2xl font-bold mb-4'>Login page</h2>

        <LoginFrom />
      </Container>
    </>
  )
}
