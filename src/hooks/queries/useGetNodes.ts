import { getNodes } from '@/api/graph'
import { useQuery } from '@tanstack/react-query'

export default function useGetNodes() {
    return useQuery({
        queryKey: ['graph', 'nodes'],
        queryFn: getNodes,
        staleTime: 10 * 60 * 1000,
        gcTime: 15 * 60 * 1000,
    })
}
