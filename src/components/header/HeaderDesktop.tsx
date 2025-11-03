'use client'

import { HeaderProps } from './Header'
import { ChevronDown, UserRound } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { UserDropdown } from './UserDropdown'
import { Button } from '../common'
import Link from 'next/link'
import { SearchBar } from './SearchBar'
import Image from 'next/image'
import { useAuthStore } from '@/stores/authStore'

export const HeaderDesktop = ({ onLogin, onLogout }: HeaderProps) => {
    const [showDropdown, setShowDropdown] = useState(false)

    const accessToken = useAuthStore((state) => state.accessToken)
    const isLoggedIn = Boolean(accessToken)

    const handleProfileClick = () => setShowDropdown((prev) => !prev)

    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <div className="relative flex flex-row justify-between px-6 py-3">
            <Link href="/">
                <Image src="/assets/wing.svg" alt="WING 로고" priority width={100} height={30} />
            </Link>

            <div className="flex flex-row items-center gap-3">
                <SearchBar />
                {isLoggedIn ? (
                    <div className="relative flex flex-row items-center gap-3">
                        <div
                            onClick={handleProfileClick}
                            className="flex flex-row justify-center items-center cursor-pointer gap-1"
                        >
                            <button className="flex justify-center items-center w-9 aspect-square rounded-full border border-neutral-300 bg-neutral-200 cursor-pointer">
                                <UserRound className="text-neutral-400" />
                            </button>
                            <ChevronDown className="size-4 text-neutral-400" />
                        </div>

                        {showDropdown && <UserDropdown onLogout={onLogout} showDropdown={showDropdown} />}
                    </div>
                ) : (
                    <div className="flex flex-row items-center gap-3">
                        <Button label="로그인" onClick={onLogin} />
                    </div>
                )}
            </div>
        </div>
    )
}
