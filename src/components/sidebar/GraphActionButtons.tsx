import { Check, X, Pencil, Trash2, LucideIcon } from 'lucide-react'
import clsx from 'clsx'

interface GraphActionButtonsProps {
    isEditing: boolean
    onSave: (e: React.MouseEvent) => void
    onCancel: (e: React.MouseEvent) => void
    onEdit: (e: React.MouseEvent) => void
    onDelete: (e: React.MouseEvent) => void
}

export const GraphActionButtons = ({ isEditing, onSave, onCancel, onEdit, onDelete }: GraphActionButtonsProps) => {
    if (isEditing) {
        return (
            <div className="flex flex-col items-start pl-2 gap-1">
                <ActionButton
                    onClick={onSave}
                    icon={Check}
                    label="저장"
                    className="text-primary-600 hover:bg-primary-800"
                />
                <ActionButton
                    onClick={onCancel}
                    icon={X}
                    label="취소"
                    className="text-neutral-500 hover:bg-neutral-200"
                />
            </div>
        )
    }

    return (
        <div className="flex flex-col items-start pl-2 gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <ActionButton
                onClick={onEdit}
                icon={Pencil}
                label="이름 변경"
                className="text-neutral-400 hover:text-neutral-600 hover:bg-neutral-200"
            />
            <ActionButton
                onClick={onDelete}
                icon={Trash2}
                label="삭제"
                className="text-neutral-400 hover:text-primary-600 hover:bg-primary-800"
            />
        </div>
    )
}

interface ActionButtonProps {
    onClick: (e: React.MouseEvent) => void
    icon: LucideIcon
    label: string
    className?: string
}

const ActionButton = ({ onClick, icon: Icon, label, className }: ActionButtonProps) => (
    <button
        onClick={onClick}
        className={clsx('cursor-pointer p-1.5 rounded-md transition-colors', className)}
        title={label}
    >
        <Icon size={14} />
    </button>
)
