import { LinkObject, NodeObject } from 'react-force-graph-2d'

export interface MyNode extends NodeObject {
    id: string
    label: string
    importance: number
    sentiment: number
}

export interface MyLink extends LinkObject {
    source: string | MyNode
    target: string | MyNode
    weight: number
}

export interface GraphData {
    nodes: MyNode[]
    links: MyLink[]
}
