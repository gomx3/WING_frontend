'use client'

import useGetNodes from '@/hooks/queries/useGetNodes'
import { KeywordSearch } from '../search'
import useGetEdges from '@/hooks/queries/useGetEdges'
import { D3GraphView } from './D3GraphView'

export const WeightGraphPanel = () => {
    const { data: nodesData, isLoading: isNodesLoading } = useGetNodes()
    const { data: edgesData, isLoading: isEdgesLoading } = useGetEdges()

    const isLoading = isNodesLoading || isEdgesLoading

    return (
        <div className="relative w-full h-full flex flex-col">
            <KeywordSearch />
            <div className="flex-1 relative overflow-hidden">
                {/* 데이터 조회 로딩 중 */}
                {isLoading && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center backdrop-blur-sm">
                        <div className="animate-spin h-10 w-10 rounded-full border-4 border-primary-600 border-t-transparent" />
                    </div>
                )}

                {/* 로딩 후 데이터가 존재하면 그래프를 그림 */}
                {!isLoading && nodesData && edgesData && <D3GraphView nodesData={nodesData} edgesData={edgesData} />}

                {/* 로딩 후 데이터가 존재하지 않는 경우 오류 문구 */}
                {!isLoading && (!nodesData || !edgesData) && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-neutral-500">그래프 데이터를 불러올 수 없습니다.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
