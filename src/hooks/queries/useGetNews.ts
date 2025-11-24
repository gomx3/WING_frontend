import { getNews } from '@/api/graph'
import { useAuthStore } from '@/stores/authStore'
import { useQuery } from '@tanstack/react-query'

export function useGetNews() {
    const accessToken = useAuthStore((state) => state.accessToken)

    return useQuery({
        queryKey: ['graph', 'news'],
        queryFn: getNews,
        staleTime: 10 * 60 * 1000,
        gcTime: 15 * 60 * 1000,
        enabled: !!accessToken,
    })
}
