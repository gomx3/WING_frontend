import { getNewTreeGraph } from '@/api/graph'
import { GetNewGraphDto } from '@/types/graph'
import { useMutation } from '@tanstack/react-query'
import { useGraphStore } from '@/stores/graphStore'
import { queryClient } from '@/lib/queryClient'

export function useRequestNewTree() {
    const setIsGraphLoading = useGraphStore((state) => state.setIsGraphLoading)
    const setSelectedGraphId = useGraphStore((state) => state.setSelectedGraphId)

    return useMutation({
        mutationFn: (dto: GetNewGraphDto) => getNewTreeGraph(dto),
        onMutate: () => {
            setIsGraphLoading(true)
        },
        onSuccess: (data) => {
            if (data?.graphId) {
                setSelectedGraphId(data.graphId)
            }

            queryClient.invalidateQueries({ queryKey: ['graphList'] })
        },
        onSettled: () => {
            setIsGraphLoading(false)
        },
    })
}
