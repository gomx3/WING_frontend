import { getTreeGraph } from '@/api/graph'
import { GetGraphDto } from '@/types/graph'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useGraphStore } from '@/stores/graphStore'

export default function useGetTreeGraph() {
    const queryClient = useQueryClient()
    const setIsGraphLoading = useGraphStore((state) => state.setIsGraphLoading)

    return useMutation({
        mutationFn: (dto: GetGraphDto) => getTreeGraph(dto),
        onMutate: () => {
            setIsGraphLoading(true)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['graph', 'nodes'] })
            queryClient.invalidateQueries({ queryKey: ['graph', 'edges'] })
            queryClient.invalidateQueries({ queryKey: ['graph', 'news'] })
        },
        onSettled: () => {
            setIsGraphLoading(false)
        },
    })
}
