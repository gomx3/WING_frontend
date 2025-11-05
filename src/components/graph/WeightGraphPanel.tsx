'use client'

import useGetNodes from '@/hooks/queries/useGetNodes'
import { KeywordSearch } from '../search'
import useGetEdges from '@/hooks/queries/useGetEdges'
import { D3GraphView } from './D3GraphView'
import { useGraphStore } from '@/stores/graphStore'

export const WeightGraphPanel = () => {
    const { data: nodesData, isLoading: isNodesLoading, isError: isNodesError } = useGetNodes()
    const { data: edgesData, isLoading: isEdgesLoading, isError: isEdgesError } = useGetEdges()

    const isGraphLoading = useGraphStore((state) => state.isGraphLoading)

    const isLoading = isNodesLoading || isEdgesLoading || isGraphLoading
    const isError = isNodesError || isEdgesError
    const hasData = nodesData && nodesData.length > 0 && edgesData && edgesData.length > 0

    return (
        <div className="relative w-full h-full flex flex-col">
            <KeywordSearch />
            <div className="flex-1 relative overflow-hidden">
                {/* Case 1: 로딩 중 (isLoading) */}
                {isLoading && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center backdrop-blur-sm">
                        <div className="animate-spin h-10 w-10 rounded-full border-4 border-primary-600 border-t-transparent" />
                    </div>
                )}

                {/* Case 2: 로딩 완료 + 데이터 있음 (성공) */}
                {!isLoading && hasData && <D3GraphView nodesData={nodesData} edgesData={edgesData} />}

                {/* Case 3: 로딩 완료 + "오류" 발생 (isError) */}
                {!isLoading && isError && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-primary-500">그래프 데이터를 불러오는 중 오류가 발생했습니다.</p>
                    </div>
                )}

                {/* Case 4: 로딩 완료 + 오류 없음 + 데이터 없음 (초기 상태) */}
                {!isLoading && !isError && !hasData && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-neutral-500">분석할 데이터가 없습니다. 키워드를 검색해주세요.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
