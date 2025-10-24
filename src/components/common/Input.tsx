'use client'

import clsx from 'clsx'
import { Eye, EyeOff, Search } from 'lucide-react'
import { InputHTMLAttributes, useState } from 'react'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    label?: string
    size?: 'sm' | 'md' | 'lg'
    variant?: 'primary' | 'secondary'
    className?: string
    showIcon?: boolean
}

export const Input = ({
    label,
    size = 'md',
    variant = 'primary',
    className = '',
    showIcon = false,
    type = 'text',
    ...props
}: InputProps) => {
    const [showPassword, setShowPassword] = useState(false)

    const sizeClasses: Record<typeof size, string> = {
        sm: '',
        md: 'rounded-[0.5rem] px-[0.625rem] py-[0.25rem] py-1 text-[0.875rem]',
        lg: 'rounded-[0.725rem] px-4 py-2 text-[1rem]',
    }

    const variantClasses: Record<typeof variant, string> = {
        primary: clsx(
            'bg-neutral-100 border border-neutral-300 placeholder-neutral-500 text-neutral-700',
            'focus:outline-none focus:border-primary-600 transition-colors duration-100'
        ),
        secondary: '',
    }

    const iconBaseClass = 'absolute top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none'

    return (
        <div>
            {label && (
                <label htmlFor={props.id || props.name} className="block mb-1 text-[0.875rem] text-white-200">
                    {label}
                </label>
            )}

            <div className="relative">
                {showIcon && <Search className={clsx(iconBaseClass, 'left-3 top-1/2 size-4')} />}

                <input
                    {...props}
                    type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
                    className={clsx(
                        'w-full font-medium',
                        sizeClasses[size],
                        variantClasses[variant],
                        showIcon && 'pl-9',
                        className
                    )}
                />

                {type === 'password' && (
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                )}
            </div>
        </div>
    )
}
