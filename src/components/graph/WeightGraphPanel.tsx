'use client'

import useGetNodes from '@/hooks/queries/useGetNodes'
import { KeywordSearch } from '../search'
import useGetEdges from '@/hooks/queries/useGetEdges'
import { D3GraphView } from './D3GraphView'

export const WeightGraphPanel = () => {
    const { data: nodesData } = useGetNodes()
    const { data: edgesData } = useGetEdges()

    if (!nodesData || !edgesData) return <div></div>

    return (
        <div className="relative w-full h-full flex flex-col">
            <KeywordSearch />
            <div className="flex-1 relative overflow-hidden">
                <D3GraphView nodesData={nodesData} edgesData={edgesData} />
            </div>
        </div>
    )
}
