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
import { AuthSkeleton } from './AuthSkeleton'

export const HeaderDesktop = ({ onLogin, onLogout }: HeaderProps) => {
    const [showDropdown, setShowDropdown] = useState(false)
    const [hasMounted, setHasMounted] = useState(false)

    const accessToken = useAuthStore((state) => state.accessToken)
    const isLoggedIn = Boolean(accessToken)

    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setHasMounted(true)
    }, [])

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
                {!hasMounted ? (
                    // 1. 서버 렌더링 + 클라이언트 Hydration 진행 시 로딩 스켈레톤 UI
                    <AuthSkeleton />
                ) : isLoggedIn ? (
                    // 2-1. Hydration 완료 + 로그인 상태
                    <div className="relative flex flex-row items-center gap-3">
                        <div ref={dropdownRef} className="relative flex flex-row items-center gap-1">
                            <button
                                onClick={() => setShowDropdown((prev) => !prev)}
                                className="flex flex-row justify-center items-center w-9 h-9 rounded-full border border-neutral-300 bg-neutral-200 cursor-pointer"
                            >
                                <UserRound className="text-neutral-400" />
                            </button>
                            <ChevronDown className="size-4 text-neutral-400" />

                            {isLoggedIn && showDropdown && (
                                <UserDropdown onLogout={onLogout} showDropdown={showDropdown} />
                            )}
                        </div>
                    </div>
                ) : (
                    // 2-2. Hydration 완료 + 로그아웃 상태
                    <div className="flex flex-row items-center gap-3">
                        <Button label="로그인" onClick={onLogin} />
                    </div>
                )}
            </div>
        </div>
    )
}
