import { X } from 'lucide-react'

interface TagProps {
    text: string
    onRemove: (tag: string) => void
}

export const Tag = ({ text, onRemove }: TagProps) => {
    return (
        <div className="flex items-center px-3 py-1.5 gap-1 bg-neutral-200/70 text-neutral-700 text-[0.875rem] font-medium rounded-full">
            <span className="pl-[0.25rem]">{text}</span>
            <button onClick={() => onRemove(text)} className="cursor-pointer">
                <X size={14} />
            </button>
        </div>
    )
}
