'use client'

import { useState } from 'react'
import { useStockAnalysis } from '@/hooks'
import { PriceChartSection } from './PriceChartSection'
import { RsiChartSection } from './RsiChartSection'
import { MomentumChartSection } from './MomentumChartSection'
import { RecommendationSection } from './RecommendationSection'
import { NewsSection } from './NewsSection'
import { DashboardSkeleton } from './DashboardSkeleton'
import { DashBoardHeader } from './DashBoardHeader'

interface Props {
    graphId: number
}

export const StockDashboard = ({ graphId }: Props) => {
    const [isExpanded, setIsExpanded] = useState(true)

    const { symbol, isDomestic, isSymbolLoading, priceMa, rsi, momentum, recommendation, news } =
        useStockAnalysis(graphId)

    if (isSymbolLoading) {
        return <DashboardSkeleton />
    }

    if (!symbol) {
        return null
    }

    return (
        <div
            className={`absolute top-4 right-4 p-4 w-[280px] bg-white border border-neutral-200 rounded-2xl z-30 flex flex-col shadow-2xl overflow-hidden transition-all duration-300 ease-in-out ${
                isExpanded ? 'h-11/12' : 'h-auto'
            }`}
        >
            <DashBoardHeader
                isDomestic={isDomestic}
                symbol={symbol}
                isExpanded={isExpanded}
                setIsExpanded={setIsExpanded}
            />

            {isExpanded && (
                <>
                    <hr className="my-4 border-neutral-300" />
                    <div className="pr-4 overflow-y-auto overflow-x-hidden space-y-4 scrollbar-hide pb-2">
                        <PriceChartSection data={priceMa} />
                        <RsiChartSection data={rsi} />
                        <MomentumChartSection data={momentum} />
                        <RecommendationSection data={recommendation} />
                        <NewsSection data={news} />
                    </div>
                </>
            )}
        </div>
    )
}
