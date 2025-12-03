import { SimulationNodeDatum } from 'd3'
import { CursorBased } from './common'

// D3 타입

export interface MyNode extends SimulationNodeDatum {
    id: string
    label: string
    weight: number
    isMain: boolean
}

export interface MyLink extends SimulationNodeDatum {
    source: string | MyNode
    target: string | MyNode
    weight: number
    sentiment?: number
    sentimentLabel?: string
    articleCount: number
}

export interface GraphData {
    nodes: MyNode[]
    links: MyLink[]
}

// 서버 응답 타입

export interface ApiNode {
    id: number
    userID: string
    graphId: number
    name: string
    weight: number
    kind: string
}

export interface ApiEdge {
    id: number
    userID: string
    graphId: number
    startPoint: string // source
    endPoint: string // target
    weight: number
    sentiment_score: number
    sentiment_label: string
    totalEstimated: number
    collectedCount: number
}

export interface News {
    id: number
    userID: string
    graphId: number
    startPoint: string
    endPoint: string
    pubDate: Date | string
    link: string
    title: string
    description: string
}

export type ApiNews = CursorBased<News[]>

export interface GetNewGraphDto {
    mainKeyword: string
    subKeywords: string[]
}

export interface GetGraphDto {
    graphId: number
}

export interface GetNewsByGraphDto {
    take?: number
    cursor?: number
    graphId: number
}

export interface GetNewsByEdgeDto extends GetNewsByGraphDto {
    startPoint: string
    endPoint: string
}

export interface TreeGraph {
    graphId: number
    savedNodes: number
    savedEdges: number
    savedNews: number
}

export type GetGraphResponse = TreeGraph

// 그래프 목록

export interface SimpleGraph {
    id: number
    userID: string
    name: string
    createdAt: Date | string
    updatedAt: Date | string
}

export type GetGraphListResponse = SimpleGraph[]
