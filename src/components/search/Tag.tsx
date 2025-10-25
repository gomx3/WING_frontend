import { X } from 'lucide-react'

interface TagProps {
    text: string
    onRemove: (tag: string) => void
}

export const Tag = ({ text, onRemove }: TagProps) => {
    return (
        <div className="flex items-center px-[0.5rem] py-[0.063rem] gap-1 bg-neutral-200/70 text-white-50 text-[0.875rem] font-medium rounded-full">
            <span className="pl-[0.25rem]">{text}</span>
            <button onClick={() => onRemove(text)} className="cursor-pointer">
                <X size={14} />
            </button>
        </div>
    )
}
