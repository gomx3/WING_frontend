import { LucideIcon } from 'lucide-react'

interface DropdownItemProps {
    label: string
    Icon?: LucideIcon
    onClick?: () => void
}

export const DropdownItem = ({ label, Icon, onClick }: DropdownItemProps) => {
    return (
        <li
            onClick={onClick}
            className="
                flex flex-row justify-start items-center px-3 py-2 gap-2 
                hover:bg-white-700 cursor-pointer
            "
        >
            {Icon && <Icon className="size-5 text-gray-200" />}
            <span className="text-[0.9rem]">{label}</span>
        </li>
    )
}
