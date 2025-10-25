import { useUserStore } from '@/stores/userStore'
import { DropdownItem } from './DropdownItem'
import { LogOut, Settings, UserRound } from 'lucide-react'
import * as motion from 'motion/react-client'

interface UserDropdownProps {
    onLogout?: () => void
    showDropdown: boolean
}

export const UserDropdown = ({ onLogout, showDropdown }: UserDropdownProps) => {
    const user = useUserStore((state) => state.user)

    return (
        <>
            {showDropdown && user && (
                <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className="absolute right-0 top-full mt-2 w-56 z-30 bg-neutral-50 border border-neutral-200 rounded-[0.875rem] shadow-2xl shadow-neutral-200"
                >
                    <div className="flex flex-col justify-center items-center my-4 space-y-3">
                        <div className="flex justify-center items-center w-12 aspect-square rounded-full border border-neutral-300 bg-neutral-200">
                            <UserRound className="text-neutral-400" size="32" />
                        </div>
                        <p className="text-[1rem] text-center font-bold text-neutral-700">{user.name}님 안녕하세요</p>
                    </div>
                    <ul className="flex flex-col">
                        <DropdownItem label="설정" Icon={Settings} />
                        <DropdownItem label="로그아웃" Icon={LogOut} onClick={onLogout} />
                    </ul>
                </motion.div>
            )}
        </>
    )
}
