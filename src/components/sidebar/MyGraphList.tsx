import { useGetGraphList } from '@/hooks'
import { useGraphStore } from '@/stores'
import clsx from 'clsx'
import { InvestModeController } from './InvestModeController'

export const MyGraphList = () => {
    const selectedGraphId = useGraphStore((state) => state.selectedGraphId)
    const setSelectedGraphId = useGraphStore((state) => state.setSelectedGraphId)

    const { data: graphList } = useGetGraphList()

    return (
        <div className="flex flex-col h-full overflow-y-auto">
            <InvestModeController />
            <hr className="my-4 border-neutral-300" />
            <ul className="space-y-2 pb-10">
                {graphList?.map((graph) => (
                    <li
                        key={graph.id}
                        onClick={() => setSelectedGraphId(graph.id)}
                        className={clsx(
                            'px-3 py-2 rounded-lg border border-neutral-300/70 cursor-pointer transition-colors',
                            selectedGraphId === graph.id
                                ? 'bg-white text-primary-600 font-semibold'
                                : 'text-neutral-600 hover:bg-neutral-200/50'
                        )}
                    >
                        <div className="truncate">{graph.name || `그래프 #${graph.id}`}</div>
                        <div className="text-sm text-neutral-400 mt-0.5">
                            {new Date(graph.createdAt).toLocaleDateString()}
                        </div>
                    </li>
                ))}

                {graphList && graphList.length === 0 && (
                    <div className="text-center text-xs text-neutral-400 py-4">저장된 그래프가 없습니다.</div>
                )}
            </ul>
        </div>
    )
}
