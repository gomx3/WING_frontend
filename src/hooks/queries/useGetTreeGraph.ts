import { getTreeGraph } from '@/api/graph'
import { GetGraphDto } from '@/types/graph'
import { useQuery } from '@tanstack/react-query'

export default function useGetTreeGraph({ mainKeyword, subKeywords, enabled }: GetGraphDto & { enabled: boolean }) {
    return useQuery({
        queryKey: ['graph', mainKeyword, [...subKeywords].sort()],
        queryFn: () => getTreeGraph({ mainKeyword, subKeywords }),
        enabled: !!enabled,
        staleTime: 10 * 60 * 1000,
        gcTime: 15 * 60 * 1000,
    })
}
