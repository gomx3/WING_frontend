import { X } from 'lucide-react'

interface TagProps {
    text: string
    onRemove: (tag: string) => void
}

export const Tag = ({ text, onRemove }: TagProps) => {
    return (
        <div className="flex items-center px-2 py-1 gap-1 bg-white-600 text-white-50 text-[0.85rem] font-medium rounded-[6px]">
            <span>{text}</span>
            <button onClick={() => onRemove(text)} className="cursor-pointer hover:text-primary-200">
                <X size={14} />
            </button>
        </div>
    )
}
