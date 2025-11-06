import { getTreeGraph } from '@/api/graph'
import { GetGraphDto } from '@/types/graph'
import { useMutation } from '@tanstack/react-query'
import { useGraphStore } from '@/stores/graphStore'
import { queryClient } from '@/lib/queryClient'

export default function useGetTreeGraph() {
    const setIsGraphLoading = useGraphStore((state) => state.setIsGraphLoading)

    return useMutation({
        mutationFn: (dto: GetGraphDto) => getTreeGraph(dto),
        onMutate: () => {
            setIsGraphLoading(true)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['graph'] })
        },
        onSettled: () => {
            setIsGraphLoading(false)
        },
    })
}
