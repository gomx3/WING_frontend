import { getWingScore } from '@/api/analysis'
import { useQuery } from '@tanstack/react-query'

export const useGetWingScore = (graphId: number | null) => {
    return useQuery({
        queryKey: ['user', 'wing-score', graphId],
        queryFn: () => getWingScore(graphId!),
        enabled: !!graphId,
        staleTime: 180 * 60 * 1000,
    })
}
