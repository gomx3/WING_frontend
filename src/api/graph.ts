import { ApiEdge, ApiNews, ApiNode, GetGraphDto, GetGraphResponse } from '@/types/graph'
import { axiosInstance } from './axios'

export const getNodes = async (): Promise<ApiNode[]> => {
    const { data } = await axiosInstance.get(`/user/nodes`)
    return data
}

export const getEdges = async (): Promise<ApiEdge[]> => {
    const { data } = await axiosInstance.get(`/user/edges`)
    return data
}

export const getNews = async (): Promise<ApiNews[]> => {
    const { data } = await axiosInstance.get(`/user/news`)
    return data
}

export const getTreeGraph = async (body: GetGraphDto): Promise<GetGraphResponse> => {
    const { data } = await axiosInstance.get(`/user/tree/by-keywords`, {
        params: body,
    })
    return data
}
