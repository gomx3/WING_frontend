'use client'

import React, { useEffect, useMemo, useRef } from 'react'
import * as d3 from 'd3'
import { ApiEdge, ApiNode, MyLink, MyNode, GraphData } from '@/types/graph'
import { useGraphStore } from '@/stores/graphStore'
import { getLinkColor } from '@/utils/graph'

interface D3GraphViewProps {
    nodesData: ApiNode[]
    edgesData: ApiEdge[]
}

export const D3GraphView = ({ nodesData, edgesData }: D3GraphViewProps) => {
    const svgRef = useRef<SVGSVGElement>(null)

    const isGraphLoading = useGraphStore((state) => state.isGraphLoading)
    const isInvestmentMode = useGraphStore((state) => state.isInvestmentMode)
    const selectedLink = useGraphStore((state) => state.selectedLink)

    const graphData = useMemo((): GraphData => {
        if (!nodesData || !edgesData) {
            return { nodes: [], links: [] }
        }

        const transformedNodes: MyNode[] = nodesData.map((node) => ({
            id: node.name,
            label: node.name,
            weight: node.weight,
            isMain: node.kind === 'MAIN',
        }))

        const transformedLinks: MyLink[] = edgesData.map((edge) => {
            return {
                source: edge.startPoint,
                target: edge.endPoint,
                weight: edge.weight,
                sentiment: edge.sentiment_score ?? 0,
                sentimentLabel: edge.sentiment_label,
                articleCount: edge.collectedCount,
            }
        })

        return {
            nodes: transformedNodes,
            links: transformedLinks,
        }
    }, [nodesData, edgesData])

    useEffect(() => {
        if (!svgRef.current) {
            return
        }

        const currentSvgNode = svgRef.current
        const svg = d3.select(currentSvgNode)

        svg.selectAll('*').remove()

        if (graphData.nodes.length === 0) {
            return
        }

        const width = currentSvgNode.clientWidth
        const height = currentSvgNode.clientHeight

        if (width === 0 || height === 0) return

        const { nodes, links } = graphData

        // 1. 링크 가중치 범위
        const linkWeights = links.map((l) => l.weight)
        const minLinkWeight = links.length > 0 ? Math.min(...linkWeights) : 0
        const maxLinkWeight = links.length > 0 ? Math.max(...linkWeights) : 1

        // 2. 노드 가중치 범위
        const nodeWeights = nodes.map((n) => n.weight)
        const minNodeWeight = Math.min(...nodeWeights)
        const maxNodeWeight = Math.max(...nodeWeights)

        const simulation = d3
            .forceSimulation<MyNode, MyLink>(nodes)
            .force(
                'link',
                d3
                    .forceLink<MyNode, MyLink>(links)
                    .id((d) => d.id)
                    .distance(250)
                    .strength((d) => d.weight * 0.5 + 0.1)
            )
            .force('charge', d3.forceManyBody().strength(-200))
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

        svg.on('click', (event) => {
            const isLinkOrNode = (event.target as HTMLElement).closest('.links line, .nodes g')
            if (!isLinkOrNode) {
                useGraphStore.setState({ selectedLink: null })
            }
        })

        const linkGroup = g
            .append('g')
            .attr('class', 'links')
            .selectAll('line')
            .data(links.filter((d) => d.articleCount > 0))
            .enter()
            .append('line')
            .style('stroke', (d) => getLinkColor(d, false))
            .style('stroke-width', (d) => {
                const normalized =
                    maxLinkWeight - minLinkWeight > 0 ? (d.weight - minLinkWeight) / (maxLinkWeight - minLinkWeight) : 0
                return 2 + normalized * 4 // 2px ~ 6px
            })
            .style('stroke-opacity', (d) => {
                const normalized =
                    maxLinkWeight - minLinkWeight > 0 ? (d.weight - minLinkWeight) / (maxLinkWeight - minLinkWeight) : 0
                return 0.3 + normalized * 0.7 // 0.3~1.0
            })
            .style('cursor', 'pointer')
            .on('click', (_event, d) => {
                const sourceId = (d.source as MyNode).id
                const targetId = (d.target as MyNode).id

                useGraphStore.setState({
                    selectedLink: { source: sourceId, target: targetId },
                })
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
                    .drag<SVGGElement, MyNode>()
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
            .attr('r', (d) => {
                const normalized =
                    maxNodeWeight - minNodeWeight > 0 ? (d.weight - minNodeWeight) / (maxNodeWeight - minNodeWeight) : 0
                return 15 + normalized * 30 // 15px ~ 45px
            })
            .attr('fill', (d) => (d.isMain ? '#B6B6B6' : '#F6F6F6'))
            .attr('stroke', (d) => (d.isMain ? '#888888' : '#CCCCCC'))
            .attr('stroke-width', 0.5)

        nodeGroup
            .append('text')
            .text((d) => d.label)
            .attr('x', 0)
            .attr('y', 0)
            .attr('dy', '.35em')
            .style('text-anchor', 'middle')
            .style('font-size', '16px')
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

        const xExtent = d3.extent(nodes, (n) => n.x!)
        const yExtent = d3.extent(nodes, (n) => n.y!)
        const minX = xExtent[0] ?? 0
        const maxX = xExtent[1] ?? 0
        const minY = yExtent[0] ?? 0
        const maxY = yExtent[1] ?? 0

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

        nodeGroup.selectAll('text').style('font-size', `${16 / scale}px`)

        return () => {
            simulation.stop()
            d3.select(currentSvgNode).selectAll('*').remove()
        }
    }, [graphData])

    useEffect(() => {
        if (!svgRef.current || isGraphLoading) {
            return
        }

        const svg = d3.select(svgRef.current)

        const { links } = graphData

        // 링크 가중치 범위
        const linkWeights = links.map((l) => l.weight)
        const minLinkWeight = links.length > 0 ? Math.min(...linkWeights) : 0
        const maxLinkWeight = links.length > 0 ? Math.max(...linkWeights) : 1

        svg.selectAll<SVGLineElement, MyLink>('.links line')
            .transition()
            .duration(300)
            .style('stroke', (d) => getLinkColor(d, isInvestmentMode))
            .style('stroke-opacity', (d) => {
                const normalized =
                    maxLinkWeight - minLinkWeight > 0 ? (d.weight - minLinkWeight) / (maxLinkWeight - minLinkWeight) : 0
                if (!selectedLink) return 0.3 + normalized * 0.7

                const sourceId = (d.source as MyNode).id
                const targetId = (d.target as MyNode).id
                return selectedLink.source === sourceId && selectedLink.target === targetId
                    ? 1 // 선택된 링크는 불투명
                    : 0.1 // 나머지는 살짝 투명
            })

        svg.selectAll<SVGGElement, MyNode>('.nodes g')
            .transition()
            .duration(300)
            .style('opacity', (d) => {
                if (!selectedLink) return 1
                // 선택된 링크와 연결된 노드만 강조
                return d.id === selectedLink.source || d.id === selectedLink.target ? 1 : 0.1
            })
    }, [isInvestmentMode, selectedLink, isGraphLoading, graphData])

    return (
        <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
                backgroundImage: `
                linear-gradient(rgba(0,0,0,.01) 2px, transparent 2px),
                linear-gradient(90deg, rgba(0,0,0,.01) 2px, transparent 2px),
                linear-gradient(rgba(0,0,0,.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,0,0,.03) 1px, transparent 1px)
            `,
                backgroundSize: `100px 100px, 100px 100px, 20px 20px, 20px 20px`,
                backgroundPosition: `-2px -2px, -2px -2px, -1px -1px, -1px -1px`,
            }}
        >
            <svg ref={svgRef} style={{ width: '100%', height: '100%', cursor: 'grab' }} />

            {isGraphLoading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center backdrop-blur-sm">
                    <div className="animate-spin h-10 w-10 rounded-full border-4 border-primary-600 border-t-transparent" />
                </div>
            )}
        </div>
    )
}
