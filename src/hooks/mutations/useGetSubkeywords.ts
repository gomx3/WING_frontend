import { postSubKeywords } from '@/api/search'
import { useMutation } from '@tanstack/react-query'

export function useGetSubKeywords() {
    return useMutation({
        mutationFn: postSubKeywords,
    })
}
