'use client'

import { useState } from 'react'
import { HeaderDesktop } from './HeaderDesktop'
import { HeaderMobile } from './HeaderMobile'
import { useRouter } from 'next/navigation'
import { User } from '@/types/user'
import { LoginModal } from './LoginModal'

export interface HeaderProps {
    user?: User
    onLogin?: () => void
    onLogout?: () => void
    onCreateAccount?: () => void
}

export const Header = () => {
    const [user, setUser] = useState<User>()
    const [showLoginModal, setShowLoginModal] = useState(false)
    const router = useRouter()

    const handleLoginClick = () => {
        setShowLoginModal(true)
    }

    const handleLoginClose = () => setShowLoginModal(false)

    const onLogin = () => {
        setUser({ name: 'Jane Doe' })
        handleLoginClose()
    }

    const onCreateAccount = () => router.push('/auth/signup')

    return (
        <>
            <header>
                <HeaderDesktop
                    user={user}
                    onLogin={handleLoginClick}
                    onLogout={() => setUser(undefined)}
                    onCreateAccount={onCreateAccount}
                />
                <HeaderMobile
                    user={user}
                    onLogin={handleLoginClick}
                    onLogout={() => setUser(undefined)}
                    onCreateAccount={onCreateAccount}
                />
            </header>

            {showLoginModal && <LoginModal onClose={handleLoginClose} onLogin={onLogin} />}
        </>
    )
}
