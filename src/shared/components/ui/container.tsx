import React from 'react'
import { cn } from '@/shared/utils'

interface IProps {
  children?: React.ReactNode
  className?: string
}

export const Container: React.FC<IProps> = ({ className, children }) => {
  return (
    <div className={cn('mx-auto max-w-4xl p-3 h-screen', className)}>
      {children}
    </div>
  )
}
