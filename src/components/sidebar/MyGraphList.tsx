import { useState } from 'react'
import clsx from 'clsx'
import { useDeleteGraph, useGetGraphList, useUpdateGraph } from '@/hooks'
import { useGraphStore } from '@/stores'
import { InvestModeController } from './InvestModeController'
import { GraphActionButtons } from './GraphActionButtons'
import { DeleteModal } from './DeleteModal'
import { SimpleGraph } from '@/types/graph'

export const MyGraphList = () => {
    const selectedGraphId = useGraphStore((state) => state.selectedGraphId)
    const setSelectedGraphId = useGraphStore((state) => state.setSelectedGraphId)

    const { data: graphList } = useGetGraphList()

    const { mutate: updateGraph } = useUpdateGraph()
    const { mutate: deleteGraph } = useDeleteGraph()

    const [editingId, setEditingId] = useState<number | null>(null)
    const [editName, setEditName] = useState('')

    const [deletingId, setDeletingId] = useState<number | null>(null)

    const handleStartEdit = (e: React.MouseEvent, graph: SimpleGraph) => {
        e.stopPropagation()
        setEditingId(graph.id)
        setEditName(graph.name || `그래프 #${graph.id}`)
    }

    const handleCancelEdit = (e: React.MouseEvent) => {
        e.stopPropagation()
        setEditingId(null)
        setEditName('')
    }

    const handleSaveEdit = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (!editName.trim()) return

        updateGraph(
            { graphId: editingId, name: editName },
            {
                onSuccess: () => setEditingId(null),
            }
        )
    }

    const handleDeleteClick = (e: React.MouseEvent, graphId: number) => {
        e.stopPropagation()
        setDeletingId(graphId)
    }

    const handleConfirmDelete = () => {
        if (deletingId === null) return

        deleteGraph(
            { graphId: deletingId },
            {
                onSuccess: () => {
                    if (selectedGraphId === deletingId) setSelectedGraphId(null)
                    setDeletingId(null)
                },
            }
        )
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            if (!editName.trim()) return
            updateGraph({ graphId: editingId, name: editName }, { onSuccess: () => setEditingId(null) })
        }
    }

    return (
        <>
            <div className="flex flex-col h-full overflow-y-auto">
                <InvestModeController />
                <hr className="my-4 border-neutral-300" />
                <ul className="space-y-2 pb-10">
                    {graphList?.map((graph) => {
                        const isEditing = editingId === graph.id
                        const isSelected = selectedGraphId === graph.id

                        return (
                            <li
                                key={graph.id}
                                onClick={() => !isEditing && setSelectedGraphId(graph.id)}
                                className={clsx(
                                    'group flex items-center justify-between px-3 py-2 rounded-lg border cursor-pointer transition-all',
                                    isSelected
                                        ? 'bg-white text-primary-600'
                                        : 'border-neutral-300 text-neutral-600 hover:border-neutral-400'
                                )}
                            >
                                {/* 왼쪽: 이름 및 날짜 영역 */}
                                <div className="flex-1 min-w-0 mr-2">
                                    <>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={editName}
                                                onChange={(e) => setEditName(e.target.value)}
                                                onKeyDown={handleKeyDown}
                                                onClick={(e) => e.stopPropagation()}
                                                className="w-full px-1 py-0.5 border border-neutral-300 text-neutral-500 rounded focus:outline-none"
                                                autoFocus
                                            />
                                        ) : (
                                            <div className="truncate font-medium">
                                                {graph.name || `그래프 #${graph.id}`}
                                            </div>
                                        )}
                                        <div className="text-sm text-neutral-400 mt-0.5">
                                            {new Date(graph.createdAt).toLocaleDateString()}
                                        </div>
                                    </>
                                </div>

                                {/* 오른쪽: 액션 버튼 영역 */}
                                <GraphActionButtons
                                    isEditing={isEditing}
                                    onSave={handleSaveEdit}
                                    onCancel={handleCancelEdit}
                                    onEdit={(e) => handleStartEdit(e, graph)}
                                    onDelete={(e) => handleDeleteClick(e, graph.id)}
                                />
                            </li>
                        )
                    })}

                    {graphList && graphList.length === 0 && (
                        <div className="text-center text-sm text-neutral-400 py-4">저장된 그래프가 없습니다.</div>
                    )}
                </ul>
            </div>

            {deletingId !== null && (
                <DeleteModal setDeletingId={setDeletingId} handleConfirmDelete={handleConfirmDelete} />
            )}
        </>
    )
}
