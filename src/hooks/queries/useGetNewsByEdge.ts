import { getNewsByEdge } from '@/api/graph'
import { useAuthStore, useGraphStore } from '@/stores'
import { useInfiniteQuery } from '@tanstack/react-query'

export function useGetNewsByEdge({ take = 20 }: { take?: number }) {
    const hydrated = useAuthStore((s) => s.hydrated)
    const accessToken = useAuthStore((state) => state.accessToken)

    const selectedLink = useGraphStore((state) => state.selectedLink)
    const selectedGraphId = useGraphStore((state) => state.selectedGraphId)

    const graphId = selectedGraphId
    const startPoint = selectedLink?.source
    const endPoint = selectedLink?.target

    return useInfiniteQuery({
        queryKey: ['graph', 'news', 'infinite', graphId, startPoint, endPoint],

        queryFn: ({ pageParam = 0 }) => {
            if (!startPoint || !endPoint) throw new Error('Invalid edge selected')

            return getNewsByEdge({
                take,
                cursor: pageParam === 0 ? undefined : pageParam,
                graphId: graphId!,
                startPoint,
                endPoint,
            })
        },

        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            if (lastPage.meta.hasNextPage) {
                return lastPage.meta.nextCursor
            }
            return undefined
        },

        staleTime: 5 * 60 * 1000,
        gcTime: 15 * 60 * 1000,
        enabled: hydrated && !!accessToken && !!graphId && !!startPoint && !!endPoint,
    })
}
