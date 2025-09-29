import { CustomListItem } from './CustomListItem'
import { Archive, LogOut, Settings } from 'lucide-react'

export const UserDropdown = ({ onLogout }: { onLogout?: () => void }) => {
    return (
        <div className="absolute right-0 mt-[167px] w-48 bg-white-800 border border-white-600 rounded shadow-lg">
            <ul className="flex flex-col">
                <CustomListItem label="내 주식" Icon={Archive} />
                <CustomListItem label="설정" Icon={Settings} />
                <CustomListItem label="로그아웃" Icon={LogOut} onClick={onLogout} />
            </ul>
        </div>
    )
}
