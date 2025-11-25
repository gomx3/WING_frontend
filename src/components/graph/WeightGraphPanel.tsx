'use client'

import { KeywordSearch } from '../search'
import { ApiNews } from '@/types/graph'
import { Renderer } from './Renderer'
import { GuideTooltip } from './GuideTooltip'

interface WeightGraphPanelProps {
    newsData: ApiNews[] | undefined
}

export const WeightGraphPanel = ({ newsData }: WeightGraphPanelProps) => {
    return (
        <div className="relative w-full h-full flex flex-col">
            <KeywordSearch />
            <div className="flex-1 relative overflow-hidden">
                <GuideTooltip />
                <Renderer newsData={newsData} />
            </div>
        </div>
    )
}
