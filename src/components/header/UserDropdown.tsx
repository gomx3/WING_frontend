import { DropdownItem } from './DropdownItem'
import { Archive, LogOut, Settings } from 'lucide-react'

export const UserDropdown = ({ onLogout }: { onLogout?: () => void }) => {
    return (
        <div className="absolute right-0 mt-[167px] w-48 z-40 bg-white-800 border border-white-600 rounded shadow-lg">
            <ul className="flex flex-col">
                <DropdownItem label="내 주식" Icon={Archive} />
                <DropdownItem label="설정" Icon={Settings} />
                <DropdownItem label="로그아웃" Icon={LogOut} onClick={onLogout} />
            </ul>
        </div>
    )
}
