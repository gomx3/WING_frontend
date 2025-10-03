'use client'

import { InputHTMLAttributes } from 'react'

// Input 태그의 기본 속성을 모두 포함하도록 확장합니다.
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string
}

export const Input = ({ label, ...props }: InputProps) => {
    return (
        <div className="w-full">
            <label htmlFor={props.id || props.name} className="block mb-1 text-[0.875rem] font-medium text-white-200">
                {label}
            </label>
            <input
                {...props}
                className="w-full px-3 py-2 bg-white-600 border border-white-400 rounded-[0.375rem] text-[0.875rem] tablet:text-[1rem] text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-400"
            />
        </div>
    )
}
