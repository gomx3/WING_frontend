import clsx from 'clsx'

interface ButtonProps {
    label: string
    size?: 'sm' | 'md' | 'lg'
    variant?: 'primary' | 'secondary' | 'outline'
    onClick?: () => void
    className?: string
}

export const Button = ({ label, size = 'md', variant = 'primary', onClick, className }: ButtonProps) => {
    const sizeClasses: Record<typeof size, string> = {
        sm: 'rounded-[3px] px-2 py-1 text-[0.8rem]',
        md: 'rounded-[4px] px-3 py-1 text-[0.9rem]',
        lg: 'rounded-[6px] px-4 py-2 text-[1rem]',
    }

    const variantClasses: Record<typeof variant, string> = {
        primary: 'bg-primary-600 text-white-900 border border-primary-600 hover:bg-primary-500',
        secondary: 'bg-white-700 text-foreground border border-white-400 hover:bg-white-600',
        outline: 'bg-transparent text-primary-500 border border-primary-500 hover:bg-primary-50',
    }

    return (
        <button
            onClick={onClick}
            className={clsx(
                'flex justify-center items-center font-medium cursor-pointer transition-colors duration-200 ease-in',
                sizeClasses[size],
                variantClasses[variant],
                className
            )}
        >
            <span>{label}</span>
        </button>
    )
}
