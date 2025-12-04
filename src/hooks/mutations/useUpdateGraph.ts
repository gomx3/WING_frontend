import { useMutation } from '@tanstack/react-query'
import { queryClient } from '@/lib/queryClient'
import { patchGraphName } from '@/api/graph'

export const useUpdateGraph = () => {
    return useMutation({
        mutationFn: patchGraphName,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['graphList'] })
        },
    })
}
