import React from 'react'
import { cn } from '@/shared/components/ui/utils'
import { IconAlertTriangleFilled } from '@tabler/icons-react'

interface IProps {
  message: string | undefined
  className?: string
}

export const FormErrors: React.FC<IProps> = ({ message, className }) => {
  if (!message) {
    return null
  }

  return (
    <p
      className={cn(
        className,
        'flex gap-2 text-sm text-center text-red-500 pt-3'
      )}
    >
      <IconAlertTriangleFilled className={'w-5 h-5'} /> {message}
    </p>
  )
}
