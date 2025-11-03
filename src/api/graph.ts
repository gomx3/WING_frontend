import { axiosInstance } from './axios'

export const getNews = async () => {
    const { data } = await axiosInstance.get(`/user/news`)
    return data
}
