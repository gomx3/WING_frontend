'use client'

import { useState } from 'react'
import { HeaderDesktop } from './HeaderDesktop'
import { HeaderMobile } from './HeaderMobile'
import Modal from '../common/Modal'
import { useRouter } from 'next/navigation'

type User = {
    name: string
}

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
        setUser({ name: 'Jane Doe' })
    }

    const handleLoginClose = () => setShowLoginModal(false)

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

            {showLoginModal && <Modal title="test" description="test" onClose={handleLoginClose} />}
        </>
    )
}
