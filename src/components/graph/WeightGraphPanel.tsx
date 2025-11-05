'use client'

import useGetNodes from '@/hooks/useGetNodes'
import { KeywordSearch } from '../search'
import { WeightGraphView } from './WeightGraphView'
import useGetEdges from '@/hooks/useGetEdges'

export const WeightGraphPanel = () => {
    const { data: nodesData } = useGetNodes()
    const { data: edgesData } = useGetEdges()

    if (!nodesData || !edgesData) return <div></div>

    return (
        <div className="relative w-full h-full flex flex-col">
            <KeywordSearch />
            <div className="flex-1 relative overflow-hidden">
                <WeightGraphView nodesData={nodesData} edgesData={edgesData} />
            </div>
        </div>
    )
}
