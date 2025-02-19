import React from 'react'

interface IProps {
  text: 'Login' | 'Register'
  isSubmitting: boolean
  className?: string
}

export const ButtonForm: React.FC<IProps> = ({ text, isSubmitting }) => {
  return (
    <>
      <button
        type='submit'
        className='px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
      >
        {isSubmitting ? 'Submitting...' : text}
      </button>
    </>
  )
}
