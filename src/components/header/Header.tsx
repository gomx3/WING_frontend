'use client'

import { useState } from 'react'
import { HeaderDesktop } from './HeaderDesktop'
// import { HeaderMobile } from './HeaderMobile'
import { User } from '@/types/user'
import { LoginModal } from './LoginModal'
import { useUserStore } from '@/stores/userStore'

export interface HeaderProps {
    user?: User
    onLogin?: () => void
    onLogout?: () => void
}

export const Header = () => {
    const [showLoginModal, setShowLoginModal] = useState(false)

    const { user, setUser } = useUserStore()

    const handleLoginClick = () => {
        setShowLoginModal(true)
    }

    const handleLoginClose = () => setShowLoginModal(false)

    const onLogin = () => {
        setUser({ name: '홍길동' })
        handleLoginClose()
    }

    return (
        <>
            <header>
                <HeaderDesktop user={user} onLogin={handleLoginClick} onLogout={() => setUser(undefined)} />
            </header>

            {showLoginModal && <LoginModal onClose={handleLoginClose} onLogin={onLogin} />}
        </>
    )
}
