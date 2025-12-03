import {
    ApiEdge,
    ApiNews,
    ApiNode,
    GetNewGraphDto,
    GetGraphListResponse,
    GetGraphResponse,
    GetGraphDto,
    GetNewsByGraphDto,
    GetNewsByEdgeDto,
} from '@/types/graph'
import { axiosInstance } from './axios'

export const getNewTreeGraph = async ({ mainKeyword, subKeywords }: GetNewGraphDto): Promise<GetGraphResponse> => {
    const { data } = await axiosInstance.get(`/user/tree/by-keywords`, {
        params: {
            mainKeyword,
            subKeywords: subKeywords.join(','),
        },
    })
    return data
}

export const getGraphList = async (): Promise<GetGraphListResponse> => {
    const { data } = await axiosInstance.get(`/user/graphs`)
    return data
}

export const getNodesByGraph = async ({ graphId }: GetGraphDto): Promise<ApiNode[]> => {
    const { data } = await axiosInstance.get(`/user/nodes/by-graph`, {
        params: { graphId },
    })
    return data
}

export const getEdgesByGraph = async ({ graphId }: GetGraphDto): Promise<ApiEdge[]> => {
    const { data } = await axiosInstance.get(`/user/edges/by-graph`, {
        params: { graphId },
    })
    return data
}

export const getNewsByGraph = async ({ take, cursor, graphId }: GetNewsByGraphDto): Promise<ApiNews> => {
    const { data } = await axiosInstance.get(`/user/news/by-graph`, {
        params: { take, cursor, graphId },
    })
    return data
}

export const getNewsByEdge = async ({
    take,
    cursor,
    graphId,
    startPoint,
    endPoint,
}: GetNewsByEdgeDto): Promise<ApiNews> => {
    const { data } = await axiosInstance.get(`/user/news/by-edge`, {
        params: { take, cursor, graphId, startPoint, endPoint },
    })
    return data
}
