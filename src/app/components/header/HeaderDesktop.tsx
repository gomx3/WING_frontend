import Image from 'next/image'
import { UserRound } from 'lucide-react'

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
    return (
        <header>
            <div className="flex flex-row justify-between px-4 py-2 border-b border-white-600">
                <Image src="/assets/wing.svg" alt="WING 로고" priority width={106} height={36} />
                {user ? (
                    <div className="flex flex-row items-center gap-3">
                        <p className="text-[0.9rem]">
                            Welcome, <b>{user.name}</b>
                        </p>
                        <button
                            onClick={onLogout}
                            className="flex justify-center items-center w-9 aspect-square rounded-full border-1 border-white-400 bg-white-700"
                        >
                            <UserRound className="text-white-50" />
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-row items-center gap-3">
                        <button onClick={onLogin}>Log in</button>
                        <button onClick={onCreateAccount}>Sign up</button>
                    </div>
                )}
            </div>
        </header>
    )
}
