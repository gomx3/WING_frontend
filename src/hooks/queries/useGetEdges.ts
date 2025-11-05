import { getEdges } from '@/api/graph'
import { useQuery } from '@tanstack/react-query'

export default function useGetEdges() {
    return useQuery({
        queryKey: ['graph', 'edges'],
        queryFn: getEdges,
        staleTime: 10 * 60 * 1000,
        gcTime: 15 * 60 * 1000,
    })
}
