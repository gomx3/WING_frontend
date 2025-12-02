import { getGraphList } from '@/api/graph'
import { useAuthStore } from '@/stores/authStore'
import { useQuery } from '@tanstack/react-query'

export function useGetGraphList() {
    const hydrated = useAuthStore((s) => s.hydrated)
    const accessToken = useAuthStore((state) => state.accessToken)

    return useQuery({
        queryKey: ['graphList'],
        queryFn: getGraphList,
        staleTime: 10 * 60 * 1000,
        gcTime: 15 * 60 * 1000,
        enabled: hydrated && !!accessToken,
    })
}
