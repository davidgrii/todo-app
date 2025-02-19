import React from 'react'

interface IProps {
  text: string
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

export const Button: React.FC<IProps> = ({ text, type = 'button' }) => {
  return (
    <>
      <button type={type} className='w-full bg-blue-500 text-white p-2'>
        {text}
      </button>
    </>
  )
}
