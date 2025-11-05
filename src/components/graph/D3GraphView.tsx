'use client'

import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { ApiEdge, ApiNode, MyLink, MyNode, GraphData } from '@/types/graph'
import { useGraphStore } from '@/stores/graphStore'

interface D3GraphViewProps {
    nodesData: ApiNode[]
    edgesData: ApiEdge[]
}

export const D3GraphView = ({ nodesData, edgesData }: D3GraphViewProps) => {
    const svgRef = useRef<SVGSVGElement>(null)

    const setSelectedLink = useGraphStore((state) => state.setSelectedLink)

    const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] })

    useEffect(() => {
        const transformedNodes: MyNode[] = nodesData.map((node) => ({
            id: node.name,
            label: node.name,
            importance: node.weight,
            sentiment: 0,
        }))

        const transformedLinks: MyLink[] = edgesData.map((edge) => ({
            source: edge.startPoint,
            target: edge.endPoint,
            weight: edge.weight,
            sentiment: edge.sentiment_score ?? 0,
        }))

        setGraphData({
            nodes: transformedNodes,
            links: transformedLinks,
        })
    }, [nodesData, edgesData])

    useEffect(() => {
        if (!svgRef.current || graphData.nodes.length === 0) {
            return
        }

        const svg = d3.select(svgRef.current)

        const width = svgRef.current.clientWidth
        const height = svgRef.current.clientHeight

        if (width === 0 || height === 0) return

        svg.selectAll('*').remove()

        const { nodes, links } = graphData

        const simulation = d3
            .forceSimulation<MyNode, MyLink>(nodes)
            .force(
                'link',
                d3
                    .forceLink<MyNode, MyLink>(links)
                    .id((d) => d.id)
                    .distance(250) // 엣지 길이 조정
                    .strength((d) => d.weight * 0.5 + 0.1)
            )
            .force('charge', d3.forceManyBody().strength(-400))
            .force('center', d3.forceCenter(width / 2, height / 2))
            .stop()

        simulation.tick(300)

        const g = svg.append('g')

        const zoom = d3
            .zoom<SVGSVGElement, unknown>()
            .scaleExtent([0.1, 8])
            .on('zoom', (event) => {
                g.attr('transform', event.transform)

                const newScale = event.transform.k
                nodeGroup.selectAll('text').style('font-size', `${16 / newScale}px`)
            })

        svg.call(zoom)

        const linkGroup = g
            .append('g')
            .attr('class', 'links')
            .selectAll('line')
            .data(links)
            .enter()
            .append('line')
            .style('stroke-width', (d) => d.weight * 4)
            .style('stroke', (d) => {
                const sentiment = d.sentiment ?? 0
                if (sentiment > 0.1) return 'rgba(240, 86, 109, 0.5)' // 긍정
                if (sentiment < -0.1) return 'rgba(67, 83, 244, 0.5)' // 부정
                return 'rgba(0,0,0,0.15)'
            })
            .style('cursor', 'pointer')
            .on('click', (event, d) => {
                const sourceId = (d.source as MyNode).id
                const targetId = (d.target as MyNode).id
                setSelectedLink({ source: sourceId, target: targetId })
            })

        const nodeGroup = g
            .append('g')
            .attr('class', 'nodes')
            .selectAll('g')
            .data(nodes)
            .enter()
            .append('g')
            .style('cursor', 'grab')
            .call(
                d3
                    .drag<any, MyNode>()
                    .on('start', (event, d) => {
                        if (!event.active) simulation.alphaTarget(0.3).restart()
                        d.fx = d.x
                        d.fy = d.y
                    })
                    .on('drag', (event, d) => {
                        d.fx = event.x
                        d.fy = event.y
                    })
                    .on('end', (event, d) => {
                        if (!event.active) simulation.alphaTarget(0)
                        d.fx = undefined
                        d.fy = undefined
                    })
            )

        nodeGroup
            .append('circle')
            .attr('r', (d) => Math.sqrt(d.importance * 100 + 700)) // 노드 크기 조정
            .attr('fill', '#e3e3e3')

        nodeGroup
            .append('text')
            .text((d) => d.label)
            .attr('x', 0)
            .attr('y', 0)
            .attr('dy', '.35em')
            .style('text-anchor', 'middle')
            .style('font-size', '14px')
            .style('font-family', 'font-pretendard, sans-serif')
            .style('fill', 'black')
            .style('pointer-events', 'none')

        const ticked = () => {
            linkGroup
                .attr('x1', (d) => (d.source as MyNode).x!)
                .attr('y1', (d) => (d.source as MyNode).y!)
                .attr('x2', (d) => (d.target as MyNode).x!)
                .attr('y2', (d) => (d.target as MyNode).y!)

            nodeGroup.attr('transform', (d) => `translate(${d.x!},${d.y!})`)
        }

        simulation.on('tick', ticked)
        simulation.alpha(1).restart()
        ticked()

        if (nodes.length === 0) return

        let minX = Infinity,
            maxX = -Infinity,
            minY = Infinity,
            maxY = -Infinity
        nodes.forEach((n) => {
            if (n.x! < minX) minX = n.x!
            if (n.x! > maxX) maxX = n.x!
            if (n.y! < minY) minY = n.y!
            if (n.y! > maxY) maxY = n.y!
        })

        const graphWidth = maxX - minX
        const graphHeight = maxY - minY

        const padding = 80
        const scaleX = graphWidth > 0 ? (width - padding) / graphWidth : 1
        const scaleY = graphHeight > 0 ? (height - padding) / graphHeight : 1
        const scale = Math.min(scaleX, scaleY, 1.5)

        const graphCenterX = (minX + maxX) / 2
        const graphCenterY = (minY + maxY) / 2

        const translateX = width / 2 - graphCenterX * scale
        const translateY = height / 2 - graphCenterY * scale

        svg.call(zoom.transform, d3.zoomIdentity.translate(translateX, translateY).scale(scale))

        nodeGroup.selectAll('text').style('font-size', `${14 / scale}px`)

        return () => {
            simulation.stop()
        }
    }, [graphData, setSelectedLink])

    return (
        <div className="absolute top-0 left-0 w-full h-full">
            <svg ref={svgRef} style={{ width: '100%', height: '100%', cursor: 'grab' }} />
        </div>
    )
}
