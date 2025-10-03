'use client'

import { Menu, UserRound, X, Archive, LogOut, Settings } from 'lucide-react'
import Image from 'next/image'
import { HeaderProps } from './Header'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '../common'
import { DropdownItem } from './DropdownItem'
import clsx from 'clsx'

export const HeaderMobile = ({ user, onLogin, onLogout, onCreateAccount }: HeaderProps) => {
    const [showMenu, setShowMenu] = useState(false)

    const toggleMenu = () => setShowMenu(!showMenu)

    return (
        <div className="flex tablet:hidden mx-3 p-2 border-b border-white-600">
            {/* overlay */}
            {showMenu && (
                <div onClick={toggleMenu} className="cursor-pointer fixed inset-0 bg-neutral-black-opacity25 z-30" />
            )}

            {/* header */}
            <button
                aria-label="메뉴 토글하기"
                onClick={toggleMenu}
                className="flex flex-row items-center gap-2 cursor-pointer"
            >
                <Menu className="size-4 text-gray-500" />
                <Image src="/assets/wing.svg" alt="WING 로고" priority width={88} height={30} />
            </button>

            {/* menu slide */}
            <div
                onClick={(e) => e.stopPropagation()}
                className={clsx(
                    'fixed top-0 left-0 flex flex-col w-[248px] h-screen z-50 p-4 gap-6 bg-white-700 transition-transform duration-300',
                    showMenu ? 'translate-x-0' : '-translate-x-full'
                )}
            >
                <div className="flex flex-row items-center justify-between">
                    <Link href="/">
                        <Image src="/assets/wing.svg" alt="WING 로고" priority width={88} height={30} />
                    </Link>
                    <button
                        aria-label="슬라이드 메뉴 닫기"
                        onClick={toggleMenu}
                        className="cursor-pointer text-white-200"
                    >
                        <X />
                    </button>
                </div>

                <div className="flex-1">
                    {user ? (
                        <div className="flex flex-col justify-between items-center h-full gap-3">
                            <div className="flex flex-col w-full gap-3">
                                <Button label="종목 투자 모드" className="w-full" />

                                <div className="flex flex-row justify-start items-center cursor-pointer gap-2">
                                    <button className="flex justify-center items-center w-9 aspect-square rounded-full border border-white-400 bg-white-700 cursor-pointer">
                                        <UserRound className="text-white-50" />
                                    </button>
                                    <p className="text-[0.9rem]">{user.name}</p>
                                </div>
                            </div>

                            <ul className="flex flex-col w-full">
                                <DropdownItem label="내 주식" Icon={Archive} />
                                <DropdownItem label="설정" Icon={Settings} />
                                <DropdownItem label="로그아웃" Icon={LogOut} onClick={onLogout} />
                            </ul>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center w-full gap-2">
                            <Button label="Log in" onClick={onLogin} variant="secondary" className="w-full" />
                            <Button label="Sign in" onClick={onCreateAccount} className="w-full" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
