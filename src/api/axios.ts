import { useAuthStore } from '@/stores/authStore'
import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
})

// 요청 인터셉터
axiosInstance.interceptors.request.use(
    (config) => {
        const { accessToken } = useAuthStore.getState()

        if (accessToken) {
            config.headers = config.headers || {}
            config.headers.Authorization = `Bearer ${accessToken}`
        }

        return config
    },
    (error) => Promise.reject(error)
)

// 응답 인터셉터
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            const authStore = useAuthStore.getState()
            authStore.logout()
            authStore.openSigninModal()
        }

        return Promise.reject(error)
    }
)
