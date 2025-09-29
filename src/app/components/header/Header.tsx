'use client'

import { useState } from 'react'
import { HeaderDesktop } from './HeaderDesktop'
import { HeaderMobile } from './HeaderMobile'

type User = {
    name: string
}

export const Header = () => {
    const [user, setUser] = useState<User>()

    return (
        <header>
            <HeaderDesktop
                user={user}
                onLogin={() => setUser({ name: 'Jane Doe' })}
                onLogout={() => setUser(undefined)}
                onCreateAccount={() => console.log('sign in')}
            />
            <HeaderMobile />
        </header>
    )
}
