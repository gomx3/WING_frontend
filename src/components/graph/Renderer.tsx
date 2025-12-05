import { useGetEdges, useGetNodes, useGetWingScore } from '@/hooks'
import { useGraphStore } from '@/stores/graphStore'
import { D3GraphView } from './D3GraphView'
import { LoadingSpinner } from '../LoadingSpinner'
import { TextSearch } from 'lucide-react'
import { StockDashboard } from '../analysis'
import { WingScorePanel } from './WingScorePanel'

export const Renderer = () => {
    const selectedGraphId = useGraphStore((state) => state.selectedGraphId)
    const isInvestmentMode = useGraphStore((state) => state.isInvestmentMode)

    const { data: nodesData, isLoading: isNodesLoading, isError: isNodesError } = useGetNodes(selectedGraphId)
    const { data: edgesData, isLoading: isEdgesLoading, isError: isEdgesError } = useGetEdges(selectedGraphId)
    const { data: wingScoreData } = useGetWingScore(selectedGraphId)

    const isGraphLoading = useGraphStore((state) => state.isGraphLoading)

    const isLoading = isNodesLoading || isEdgesLoading || isGraphLoading
    const isError = isNodesError || isEdgesError
    const hasData = nodesData && nodesData.length > 0 && edgesData && edgesData.length > 0

    if (isLoading) return <LoadingSpinner />

    // 로그인 직후 — 그래프 ID 없음
    if (!selectedGraphId) {
        return (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <TextSearch className="w-12 h-12 text-neutral-300" />
                <p className="text-center text-neutral-500 whitespace-pre-line">
                    그래프가 아직 선택되지 않았습니다.{'\n'}내 그래프 목록에서 선택하거나,
                    <span className="font-bold text-primary-600"> 키워드를 검색</span>해 분석을 시작하세요
                </p>
            </div>
        )
    }

    return (
        <div className="w-full">
            {/* 데이터 있음 (성공) */}
            {!isLoading && hasData && <D3GraphView nodesData={nodesData} edgesData={edgesData} />}

            {/* 오류 발생 */}
            {!isLoading && isError && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-primary-500">그래프 데이터를 불러오는 중 오류가 발생했습니다.</p>
                </div>
            )}

            {/* 오류 없음 + 데이터 없음 (초기 상태) */}
            {!isLoading && !isError && !hasData && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-neutral-500">선택한 그래프에 데이터가 없습니다.</p>
                </div>
            )}

            {isInvestmentMode && selectedGraphId && <StockDashboard graphId={selectedGraphId} />}
            {isInvestmentMode && selectedGraphId && wingScoreData && (
                <WingScorePanel wingScore={wingScoreData.wingScore} />
            )}
        </div>
    )
}
