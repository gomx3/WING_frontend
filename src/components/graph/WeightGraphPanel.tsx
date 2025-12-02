'use client'

import { KeywordSearch } from '../search'
import { Renderer } from './Renderer'
import { GuideTooltip } from './GuideTooltip'

export const WeightGraphPanel = () => {
    return (
        <div className="relative w-full h-full flex flex-col">
            <KeywordSearch />
            <div className="flex-1 relative overflow-hidden">
                <GuideTooltip />
                <Renderer />
            </div>
        </div>
    )
}
