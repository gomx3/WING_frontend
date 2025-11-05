import { getEdges } from '@/api/graph'
import { useAuthStore } from '@/stores/authStore'
import { useQuery } from '@tanstack/react-query'

export default function useGetEdges() {
    const accessToken = useAuthStore((state) => state.accessToken)

    return useQuery({
        queryKey: ['graph', 'edges'],
        queryFn: getEdges,
        staleTime: 10 * 60 * 1000,
        gcTime: 15 * 60 * 1000,
        enabled: !!accessToken,
    })
}
