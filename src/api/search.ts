import { axiosInstance } from './axios'

export const postSubKeywords = async (body: GetSubkeywordsDto): Promise<GetSubkeywordsResponse> => {
    const { data } = await axiosInstance.post(`/keywords/subkeywords`, body)
    return data
}
