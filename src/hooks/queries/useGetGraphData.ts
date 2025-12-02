import { getEdgesByGraph, getNodesByGraph } from '@/api/graph'
import { useAuthStore } from '@/stores/authStore'
import { useQuery } from '@tanstack/react-query'

export function useGetEdges(graphId: number | null) {
    const hydrated = useAuthStore((s) => s.hydrated)
    const accessToken = useAuthStore((state) => state.accessToken)

    return useQuery({
        queryKey: ['edges', graphId],
        queryFn: () => getEdgesByGraph({ graphId: graphId! }),
        staleTime: 10 * 60 * 1000,
        gcTime: 15 * 60 * 1000,
        enabled: hydrated && !!accessToken && !!graphId,
    })
}

export const useGetNodes = (graphId: number | null) => {
    const hydrated = useAuthStore((s) => s.hydrated)
    const accessToken = useAuthStore((state) => state.accessToken)

    return useQuery({
        queryKey: ['nodes', graphId ?? 'default'],
        queryFn: () => getNodesByGraph({ graphId: graphId! }),
        staleTime: 10 * 60 * 1000,
        gcTime: 15 * 60 * 1000,
        enabled: hydrated && !!accessToken && !!graphId,
    })
}
