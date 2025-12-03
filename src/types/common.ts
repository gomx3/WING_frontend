export interface CursorBased<T> {
    items: T
    meta: {
        hasNextPage: boolean
        nextCursor: number
    }
}
