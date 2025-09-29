'use client'

import { useState } from 'react'
import { HeaderDesktop } from './HeaderDesktop'

type User = {
    name: string
}

export const Header = () => {
    const [user, setUser] = useState<User>()

    return (
        <HeaderDesktop
            user={user}
            onLogin={() => setUser({ name: 'Jane Doe' })}
            onLogout={() => setUser(undefined)}
            onCreateAccount={() => setUser({ name: 'Jane Doe' })}
        />
    )
}
