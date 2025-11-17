import { cn } from '@/packages/utils/styles'

type Props = {
  size?: number
  className?: string
}

export const Logo = ({ size = 32, className }: Props) => {
  return (
    <img
      src={'/logo.svg'}
      width={size}
      height={size}
      alt="TBChat"
      className={cn('rounded-sm', className)}
    />
  )
}
