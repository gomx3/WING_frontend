import clsx from 'clsx'
import { PropsWithChildren } from 'react'

interface TabButtonProps {
    label: string
    handleClick: () => void
    isActive: boolean
}

export const TabButton = ({ label, handleClick, isActive, children }: PropsWithChildren<TabButtonProps>) => {
    return (
        <button onClick={handleClick} className="space-y-1">
            <div
                className={clsx(
                    'flex justify-center items-center aspect-square rounded-[0.5rem] cursor-pointer transition-colors duration-100',
                    'text-neutral-500 border border-neutral-300 hover:bg-neutral-200',
                    isActive && 'bg-neutral-200'
                )}
            >
                {children}
            </div>
            <p className="text-[0.875rem] tracking-[-0.45px]">{label}</p>
        </button>
    )
}
