import { getNodes } from '@/api/graph'
import { useAuthStore } from '@/stores/authStore'
import { useQuery } from '@tanstack/react-query'

export default function useGetNodes() {
    const accessToken = useAuthStore((state) => state.accessToken)

    return useQuery({
        queryKey: ['graph', 'nodes'],
        queryFn: getNodes,
        staleTime: 10 * 60 * 1000,
        gcTime: 15 * 60 * 1000,
        enabled: !!accessToken,
    })
}
