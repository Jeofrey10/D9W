import React from 'react'
import { cn } from '@/lib/utils'

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize
  as?: React.ElementType
}

export const Container: React.FC<ContainerProps> = ({
  className,
  size = 'lg',
  as: Component = 'div',
  children,
  ...props
}) => {
  const sizeClasses: Record<ContainerSize, string> = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-7xl',
    xl: 'max-w-[1440px]',
    full: 'max-w-full',
  }

  return (
    <Component
      className={cn(
        'w-full mx-auto px-4 sm:px-6 lg:px-8',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
