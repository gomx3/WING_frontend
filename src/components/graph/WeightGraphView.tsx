'use client'

import dynamic from 'next/dynamic'
import React, { useEffect, useRef, useState } from 'react'

import { ForceGraphMethods, ForceGraphProps } from 'react-force-graph-2d'
import { ApiEdge, ApiNode, MyLink, MyNode, GraphData } from '@/types/graph'
import { useGraphStore } from '@/stores/graphStore'

const ForceGraph = dynamic(() => import('react-force-graph-2d'), {
    ssr: false,
}) as React.ComponentType<
    ForceGraphProps<MyNode, MyLink> & {
        ref?: React.Ref<ForceGraphMethods<MyNode, MyLink>>
    }
>

interface WeightGraphViewProps {
    nodesData: ApiNode[]
    edgesData: ApiEdge[]
}

export const WeightGraphView = ({ nodesData, edgesData }: WeightGraphViewProps) => {
    const forceRef = useRef<ForceGraphMethods<MyNode, MyLink>>(null)
    const hasZoomedRef = useRef(false)

    const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] })

    const setSelectedLink = useGraphStore((state) => state.setSelectedLink)

    useEffect(() => {
        // 1. API 노드 데이터 변환 (ApiNode[] -> MyNode[])
        const transformedNodes: MyNode[] = nodesData.map((node) => ({
            id: node.name, // 👈 엣지의 startPoint/endPoint와 연결될 고유 ID
            label: node.name,
            importance: node.weight,
            sentiment: 0, // 👈 [중요] 'Node' 타입에 sentiment가 없으므로 0 (중립)으로 설정
        }))

        // 2. API 엣지 데이터 변환 (ApiEdge[] -> MyLink[])
        const transformedLinks: MyLink[] = edgesData.map((edge) => ({
            source: edge.startPoint, // 👈 'node.name' (id)과 일치해야 함
            target: edge.endPoint, // 👈 'node.name' (id)과 일치해야 함
            weight: edge.weight,
            sentiment: edge.sentiment_score, // 👈 [신규] 엣지에 감성 점수 추가
        }))

        // 3. 변환된 데이터를 state에 저장
        setGraphData({
            nodes: transformedNodes,
            links: transformedLinks,
        })

        hasZoomedRef.current = false

        // 4. 데이터 변경 후 시뮬레이션 재가열
        if (forceRef.current) {
            forceRef.current.d3ReheatSimulation()
        }
    }, [nodesData, edgesData])

    return (
        <div className="absolute top-0 left-0 w-full h-full">
            <ForceGraph
                ref={forceRef}
                graphData={graphData}
                nodeVal={(node: MyNode) => node.importance * 10 + 5}
                linkWidth={(link: MyLink) => link.weight * 4}
                linkColor={(link: MyLink) => {
                    const sentiment = link.sentiment ?? 0
                    if (sentiment > 0.1) return 'rgba(240, 86, 109, 0.5)' // 긍정
                    if (sentiment < -0.1) return 'rgba(67, 83, 244, 0.5)' // 부정
                    return 'rgba(0,0,0,0.15)' // 중립
                }}
                nodeCanvasObject={(node: MyNode, ctx, globalScale) => {
                    const label = node.label
                    const fontSize = 14 / globalScale

                    const nodeArea = node.importance * 10 + 5
                    const radius = Math.sqrt(nodeArea)

                    ctx.beginPath()
                    ctx.arc(node.x!, node.y!, radius, 0, 2 * Math.PI, false)
                    ctx.fillStyle = '#e3e3e3'
                    ctx.fill()

                    ctx.font = `${fontSize}px font-pretendard`
                    ctx.textAlign = 'center'
                    ctx.textBaseline = 'middle'
                    ctx.fillStyle = 'black'
                    ctx.fillText(label, node.x!, node.y!)
                }}
                onEngineStop={() => {
                    if (forceRef.current && !hasZoomedRef.current) {
                        forceRef.current.zoomToFit(0, 40)
                        hasZoomedRef.current = true
                    }
                }}
                nodePointerAreaPaint={(node: MyNode, color, ctx, globalScale) => {
                    const nodeArea = node.importance * 10 + 5
                    const radius = Math.sqrt(nodeArea)

                    ctx.beginPath()
                    ctx.arc(node.x!, node.y!, radius, 0, 2 * Math.PI, false)
                    ctx.fillStyle = color
                    ctx.fill()
                }}
                onLinkClick={(link: MyLink) => {
                    const sourceId = (link.source as MyNode).id ?? (link.source as string)
                    const targetId = (link.target as MyNode).id ?? (link.target as string)

                    setSelectedLink({ source: sourceId, target: targetId })
                }}
            />
        </div>
    )
}
