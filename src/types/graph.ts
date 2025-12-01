import { SimulationNodeDatum } from 'd3'

export interface MyNode extends SimulationNodeDatum {
    id: string
    label: string
    weight: number
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

export interface ApiNode {
    id: number
    userID: string
    name: string
    weight: number
}

export interface ApiEdge {
    id: number
    userID: string
    startPoint: string // source
    endPoint: string // target
    weight: number
    sentiment_score: number
    sentiment_label: string
}

export interface ApiNews {
    id: number
    userID: string
    startPoint: string
    endPoint: string
    pubDate: Date | string
    link: string
    title: string
    description: string
}

export type GetNodesResponse = ApiNode[]
export type GetEdgesResponse = ApiEdge[]
export type GetNewsListResponse = ApiNews[]

export interface GetGraphDto {
    mainKeyword: string
    subKeywords: string[]
}

export interface TreeGraph {
    savedNodes: number
    savedEdges: number
    savedNews: number
}

export type GetGraphResponse = TreeGraph
