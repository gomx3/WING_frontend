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
        sm: 'px-[0.625rem] py-[0.25rem] py-1 text-[0.8rem]',
        md: 'rounded-[0.5rem] px-[0.625rem] py-1 text-[0.875rem]',
        lg: 'rounded-[0.725rem] px-4 py-2 text-[0.925rem] tablet:text-[1rem]',
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
                'flex justify-center items-center font-medium cursor-pointer transition-colors duration-100 ease-in whitespace-nowrap',
                sizeClasses[size],
                variantClasses[variant],
                className
            )}
        >
            <span>{label}</span>
        </button>
    )
}
