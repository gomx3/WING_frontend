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
                flex flex-row justify-start items-center px-4 py-4 gap-2 
                hover:bg-neutral-100/80 cursor-pointer
            "
        >
            {Icon && <Icon className="size-5 text-neutral-500" />}
            <span className="text-[1rem]">{label}</span>
        </li>
    )
}
