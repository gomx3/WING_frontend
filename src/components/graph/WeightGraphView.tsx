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
                // [제거] nodeColor={() => '#e3e3e3'}
                linkWidth={(link: MyLink) => link.weight * 4}
                linkColor={(link: MyLink) => {
                    const sentiment = link.sentiment ?? 0
                    if (sentiment > 0.1) return 'rgba(240, 86, 109, 0.5)' // 긍정
                    if (sentiment < -0.1) return 'rgba(67, 83, 244, 0.5)' // 부정
                    return 'rgba(0,0,0,0.15)' // 중립
                }}
                // [수정] nodeCanvasObject에서 원과 텍스트를 모두 그립니다.
                nodeCanvasObject={(node: MyNode, ctx, globalScale) => {
                    const label = node.label
                    const fontSize = 14 / globalScale

                    // 1. 노드 크기(반지름) 계산
                    // nodeVal은 '면적'을 기준으로 하므로, 반지름은 제곱근(sqrt)을 사용합니다.
                    const nodeArea = node.importance * 10 + 5
                    const radius = Math.sqrt(nodeArea)

                    // 2. [추가] 회색 원(노드 본체) 그리기
                    ctx.beginPath()
                    ctx.arc(node.x!, node.y!, radius, 0, 2 * Math.PI, false)
                    ctx.fillStyle = '#e3e3e3' // 👈 여기에 원하는 회색을 지정
                    ctx.fill()

                    // 3. [유지] 검은색 텍스트 그리기
                    ctx.font = `${fontSize}px font-pretendard`
                    ctx.textAlign = 'center'
                    ctx.textBaseline = 'middle'
                    ctx.fillStyle = 'black' // 텍스트 색상
                    ctx.fillText(label, node.x!, node.y!)
                }}
                // 3. [추가] 엔진이 멈췄을 때(레이아웃 계산 완료) 실행
                onEngineStop={() => {
                    if (forceRef.current && !hasZoomedRef.current) {
                        // 0.5초(500ms) 동안, 40px 여백만 남기고 줌인
                        // 40이라는 숫자를 20(더 가깝게)이나 100(더 멀게)으로 조절해 보세요.
                        forceRef.current.zoomToFit(500, 40)

                        // 줌을 실행했다고 표시 (다시 실행 안 함)
                        hasZoomedRef.current = true
                    }
                }}
                // [추가] 예제 코드처럼, 커스텀 노드의 클릭/호버 영역을 설정합니다.
                // 이렇게 해야 노드 클릭, 툴팁(nodeLabel) 등이 정상 작동합니다.
                nodePointerAreaPaint={(node: MyNode, color, ctx, globalScale) => {
                    const nodeArea = node.importance * 10 + 5
                    const radius = Math.sqrt(nodeArea)

                    // 노드 본체와 동일한 영역을 그려줍니다.
                    ctx.beginPath()
                    ctx.arc(node.x!, node.y!, radius, 0, 2 * Math.PI, false)
                    ctx.fillStyle = color // 👈 라이브러리가 주는 'color'를 사용해야 함
                    ctx.fill()
                }}
                onLinkClick={(link: MyLink) => {
                    // const sourceId = (link.source as MyNode).id ?? link.source
                    // const targetId = (link.target as MyNode).id ?? link.target
                    // const sentiment = link.sentiment ?? 0

                    // alert(
                    //     `[${sourceId} → ${targetId}]\n` +
                    //         `가중치: ${link.weight.toFixed(2)}\n` +
                    //         `감성분석: ${sentiment.toFixed(2)}`
                    // )

                    // 1. sourceId와 targetId 추출 (기존과 동일)
                    const sourceId = (link.source as MyNode).id ?? (link.source as string)
                    const targetId = (link.target as MyNode).id ?? (link.target as string)

                    // 2. [수정] alert 대신 Zustand 스토어에 상태 저장
                    setSelectedLink({ source: sourceId, target: targetId })
                }}
            />
        </div>
    )
}
