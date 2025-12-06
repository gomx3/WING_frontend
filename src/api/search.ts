import { GetSubkeywordsDto, GetSubkeywordsResponse, TopKeywordsResponse } from '@/types/search'
import { axiosInstance } from './axios'

export const postSubKeywords = async (body: GetSubkeywordsDto): Promise<GetSubkeywordsResponse> => {
    const { data } = await axiosInstance.post(`/keywords/subkeywords`, body)
    return data
}

export const getTopKeywords = async (): Promise<TopKeywordsResponse> => {
    const { data } = await axiosInstance.get(`/user/top-keywords`)
    return data
}
