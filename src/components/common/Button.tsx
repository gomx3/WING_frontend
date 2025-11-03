import clsx from 'clsx'
import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string
    size?: 'sm' | 'md' | 'lg'
    variant?: 'primary' | 'secondary' | 'outline'
    className?: string
}

export const Button = ({ label, size = 'md', variant = 'primary', className, ...props }: ButtonProps) => {
    const sizeClasses: Record<typeof size, string> = {
        sm: 'px-[0.625rem] py-[0.25rem] py-1 text-[0.8rem]',
        md: 'rounded-[0.5rem] px-[0.625rem] py-1 text-[0.875rem]',
        lg: 'rounded-[0.725rem] px-4 py-2 text-[0.925rem] tablet:text-[1rem]',
    }

    const variantClasses: Record<typeof variant, string> = {
        primary:
            'bg-primary-600 text-neutral-50 border border-primary-600 hover:bg-primary-500 disabled:bg-gray-200 disabled:border-neutral-300 disabled:text-neutral-400',
        secondary: 'bg-neutral-300 text-foreground border border-neutral-700 hover:bg-neutral-400',
        outline: 'bg-transparent text-primary-500 border border-primary-500 hover:bg-primary-50',
    }

    return (
        <button
            disabled={props.disabled}
            onClick={props.onClick}
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
