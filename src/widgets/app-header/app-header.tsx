'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export const AppHeader = () => {
  const router = useRouter()

  const [token, setState] = useState<string | null>(null)

  const handleLogin = () => {
    router.push('/login')
  }

  const handleLogout = async () => {
    localStorage.removeItem('token')

    try {
      await fetch('/api/auth/logout', {
        method: 'GET'
      })

      router.push('/login')
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const tokenFromLocalStorage = localStorage.getItem('token')
      setState(tokenFromLocalStorage)
    }
  }, [])

  return (
    <>
      <header className='fixed w-full text-white p-4 border-b shadow'>
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl font-bold text-blue-600'>Todo App</h1>

          <nav>
            {token ? (
              <button
                className='bg-red-500 px-4 py-2 rounded'
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <button
                className='bg-blue-600 px-12 py-2.5 rounded'
                onClick={handleLogin}
              >
                Login
              </button>
            )}
          </nav>
        </div>
      </header>
    </>
  )
}
