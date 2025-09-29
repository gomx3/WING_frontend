'use client'

import Image from 'next/image'
import { ChevronDown, UserRound } from 'lucide-react'
import { useState } from 'react'
import { UserDropdown } from './UserDropdown'
import { Button } from '@/common'

type User = {
    name: string
}

export interface HeaderProps {
    user?: User
    onLogin?: () => void
    onLogout?: () => void
    onCreateAccount?: () => void
}

export const HeaderDesktop = ({ user, onLogin, onLogout, onCreateAccount }: HeaderProps) => {
    const [showDropdown, setShowDropdown] = useState(false)

    const handleProfileClick = () => setShowDropdown(!showDropdown)

    return (
        <div className="relative hidden tablet:flex flex-row justify-between px-4 py-2 border-b border-white-600">
            {/* left */}
            <Image src="/assets/wing.svg" alt="WING 로고" priority width={106} height={36} />

            {/* right */}
            {user ? (
                <div className="flex flex-row items-center gap-3">
                    <Button label="종목 투자 모드" />
                    <p className="text-[0.9rem]">
                        Welcome, <b>{user.name}</b>!
                    </p>
                    <div
                        onClick={handleProfileClick}
                        className="flex flex-row justify-center items-center cursor-pointer gap-1"
                    >
                        <button className="flex justify-center items-center w-9 aspect-square rounded-full border-1 border-white-400 bg-white-700 cursor-pointer">
                            <UserRound className="text-white-50" />
                        </button>
                        <ChevronDown className="size-4" />
                    </div>

                    {showDropdown && <UserDropdown onLogout={onLogout} />}
                </div>
            ) : (
                <div className="flex flex-row items-center gap-3">
                    <Button label="Log in" onClick={onLogin} variant="secondary" />
                    <Button label="Sign in" onClick={onCreateAccount} />
                </div>
            )}
        </div>
    )
}
