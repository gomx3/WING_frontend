export interface GetSubkeywordsDto {
    mainKeyword: string
    count: number
}

export interface GetSubkeywordsResponse {
    mainKeyword: string
    subKeywords: string[]
}
