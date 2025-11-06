'use client'

import React, { useEffect, useMemo, useRef } from 'react'
import * as d3 from 'd3'
import { ApiEdge, ApiNode, MyLink, MyNode, GraphData, ApiNews } from '@/types/graph'
import { useGraphStore } from '@/stores/graphStore'

interface D3GraphViewProps {
    nodesData: ApiNode[]
    edgesData: ApiEdge[]
    newsData: ApiNews[] | undefined
}

export const D3GraphView = ({ nodesData, edgesData, newsData }: D3GraphViewProps) => {
    const svgRef = useRef<SVGSVGElement>(null)

    const isGraphLoading = useGraphStore((state) => state.isGraphLoading)
    const isInvestmentMode = useGraphStore((state) => state.isInvestmentMode)

    const graphData = useMemo((): GraphData => {
        if (!nodesData || !edgesData) {
            return { nodes: [], links: [] }
        }

        const transformedNodes: MyNode[] = nodesData.map((node) => ({
            id: node.name,
            label: node.name,
            importance: node.weight,
        }))

        const transformedLinks: MyLink[] = edgesData.map((edge) => {
            // 이 링크에 해당하는 기사 수를 계산
            const articleCount = newsData
                ? newsData.filter((article) => {
                      const matchForward = article.startPoint === edge.startPoint && article.endPoint === edge.endPoint
                      const matchBackward = article.startPoint === edge.endPoint && article.endPoint === edge.startPoint
                      return matchForward || matchBackward
                  }).length
                : 0

            return {
                source: edge.startPoint,
                target: edge.endPoint,
                weight: edge.weight,
                sentiment: edge.sentiment_score ?? 0,
                sentimentLabel: edge.sentiment_label,
                articleCount: articleCount, // 계산된 값 할당
            }
        })

        return {
            nodes: transformedNodes,
            links: transformedLinks,
        }
    }, [nodesData, edgesData, newsData])

    useEffect(() => {
        if (!svgRef.current) {
            return
        }

        const currentSvgNode = svgRef.current
        const svg = d3.select(currentSvgNode)

        if (graphData.nodes.length === 0) {
            return
        }

        const width = currentSvgNode.clientWidth
        const height = currentSvgNode.clientHeight

        if (width === 0 || height === 0) return

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
            .style('stroke-width', (d) => d.weight * 5)
            .style('stroke', (d) => getLinkColor(d, false))
            .style('cursor', 'pointer')
            .on('click', (event, d) => {
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
            .attr('r', (d) => Math.sqrt(d.importance * 100 + 700)) // 노드 크기 조정
            .attr('fill', '#F6F6F6')
            .attr('stroke', '#E3E3E3')
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

        svg.selectAll<SVGLineElement, MyLink>('.links line')
            .transition()
            .duration(300)
            .style('stroke', (d) => getLinkColor(d, isInvestmentMode))
    }, [isInvestmentMode, isGraphLoading, graphData])

    /**
     * 링크(엣지)의 색상을 결정하는 헬퍼 함수
     * @param link - MyLink 데이터
     * @param isInvestment - 현재 투자 모드 여부
     */
    const getLinkColor = (link: MyLink, isInvestment: boolean): string => {
        // 1. 기사 수가 0이면 무조건 매우 연한 색
        if (link.articleCount === 0) {
            return 'rgba(230, 230, 230, 0.2)'
        }

        const label = link.sentimentLabel ?? 'neutral'

        // 2. 투자 모드일 때
        if (isInvestment) {
            switch (label) {
                case 'positive':
                    return 'rgba(240, 86, 109, 0.5)' // 긍정
                case 'negative':
                    return 'rgba(67, 83, 244, 0.5)' // 부정
                case 'neutral':
                default:
                    return 'rgba(180, 180, 180, 0.5)' // 중립
            }
        }

        // 3. 일반 모드일 때 (기사 수는 0이 아님)
        if (label === 'neutral') {
            return 'rgba(180, 180, 180, 0.5)' // 중립
        }

        // 4. 일반 모드 + positive/negative
        return 'rgba(0,0,0,0.15)'
    }

    return (
        <div className="absolute top-0 left-0 w-full h-full">
            <svg ref={svgRef} style={{ width: '100%', height: '100%', cursor: 'grab' }} />

            {isGraphLoading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center backdrop-blur-sm">
                    <div className="animate-spin h-10 w-10 rounded-full border-4 border-primary-600 border-t-transparent" />
                </div>
            )}
        </div>
    )
}
