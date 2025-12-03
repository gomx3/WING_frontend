import {
    ApiEdge,
    ApiNews,
    ApiNode,
    GetNewGraphDto,
    GetGraphListResponse,
    GetGraphResponse,
    GraphDto,
    GetNewsByGraphDto,
    GetNewsByEdgeDto,
    ResponseGraphName,
    ResponseDeleteGraph,
    DeleteGraphDto,
    UpdateGraphDto,
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

export const getNodesByGraph = async ({ graphId }: GraphDto): Promise<ApiNode[]> => {
    const { data } = await axiosInstance.get(`/user/nodes/by-graph`, {
        params: { graphId },
    })
    return data
}

export const getEdgesByGraph = async ({ graphId }: GraphDto): Promise<ApiEdge[]> => {
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

export const patchGraphName = async ({ graphId, name }: UpdateGraphDto): Promise<ResponseGraphName> => {
    const { data } = await axiosInstance.patch(`/user/graphs/${graphId}`, { name })
    return data
}

export const deleteGraph = async ({ graphId }: DeleteGraphDto): Promise<ResponseDeleteGraph> => {
    const { data } = await axiosInstance.delete(`/user/graphs/${graphId}`)
    return data
}
