import { getNews } from '@/api/graph'
import { useQuery } from '@tanstack/react-query'

export default function useGetNews() {
    return useQuery({
        queryKey: ['graph', 'news'],
        queryFn: getNews,
        staleTime: 10 * 60 * 1000,
        gcTime: 15 * 60 * 1000,
    })
}
