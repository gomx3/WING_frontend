import { LOCAL_STORAGE_KEY } from '@/constants/key'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
})

// 요청 인터셉터
axiosInstance.interceptors.request.use(
    (config) => {
        const { getItem } = useLocalStorage(LOCAL_STORAGE_KEY.AT)
        const accessToken = getItem()

        // accessToken이 존재하면 Authorization 헤더에 Bearer 토큰 형식을 추가한다.
        if (accessToken) {
            config.headers = config.headers || {}
            config.headers.Authorization = `Bearer ${accessToken}`
        }

        // 수정된 요청 설정을 반환
        return config
    },
    (error) => Promise.reject(error)
)
