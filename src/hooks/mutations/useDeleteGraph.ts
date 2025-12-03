import { deleteGraph } from '@/api/graph'
import { queryClient } from '@/lib/queryClient'
import { useMutation } from '@tanstack/react-query'

export const useDeleteGraph = () => {
    return useMutation({
        mutationFn: deleteGraph,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['graphList'] })
        },
    })
}
