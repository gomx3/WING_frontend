'use client'

import dynamic from 'next/dynamic'
import React, { useEffect, useRef } from 'react'

import { ForceGraphMethods, ForceGraphProps } from 'react-force-graph-2d'
import { MyLink, MyNode } from '@/types/graph'
import { useGraphStore } from '@/stores/graphStore'

const ForceGraph = dynamic(() => import('react-force-graph-2d'), {
    ssr: false,
}) as React.ComponentType<
    ForceGraphProps<MyNode, MyLink> & {
        ref?: React.Ref<ForceGraphMethods<MyNode, MyLink>>
    }
>

export const WeightGraphView = () => {
    const forceRef = useRef<ForceGraphMethods<MyNode, MyLink>>(null)

    const { graphData } = useGraphStore()

    useEffect(() => {
        if (forceRef.current) {
            forceRef.current.d3Force('charge')?.strength(-350)
            forceRef.current.d3Force('link')?.distance(100)
        }
    }, [])

    useEffect(() => {
        if (forceRef.current) {
            forceRef.current.d3ReheatSimulation()
        }
    }, [graphData])

    return (
        <div className="absolute top-0 left-0 w-full h-full">
            <ForceGraph
                ref={forceRef}
                graphData={graphData}
                nodeVal={(node: MyNode) => node.importance * 10 + 5}
                nodeColor={(node: MyNode) => {
                    if (node.sentiment > 0.1) return '#f0566d' // 긍정
                    if (node.sentiment < -0.1) return '#f44336' // 부정
                    return '#e3e3e3' // 중립
                }}
                linkWidth={(link: MyLink) => link.weight * 4}
                linkColor={() => 'rgba(0,0,0,0.15)'}
                nodeCanvasObject={(node: MyNode, ctx, globalScale) => {
                    const label = node.label
                    const fontSize = 14 / globalScale
                    ctx.font = `${fontSize}px font-pretendard`
                    ctx.textAlign = 'center'
                    ctx.textBaseline = 'middle'
                    ctx.fillStyle = 'black'
                    ctx.fillText(label, node.x!, node.y!)
                }}
                nodeCanvasObjectMode={() => 'after'}
                onNodeClick={(node: MyNode) =>
                    alert(
                        `[${node.label}]\n중요도: ${node.importance.toFixed(2)}\n감성분석: ${node.sentiment.toFixed(2)}`
                    )
                }
            />
        </div>
    )
}
