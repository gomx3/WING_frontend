import { getTopKeywords } from '@/api/search'
import { useAuthStore } from '@/stores'
import { useQuery } from '@tanstack/react-query'

export const useGetTopKeywords = () => {
    const hydrated = useAuthStore((s) => s.hydrated)
    const accessToken = useAuthStore((state) => state.accessToken)

    return useQuery({
        queryKey: ['topKeywords'],
        queryFn: getTopKeywords,
        staleTime: 10 * 60 * 1000,
        gcTime: 15 * 60 * 1000,
        enabled: hydrated && !!accessToken,
    })
}
