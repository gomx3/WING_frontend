interface GetSubkeywordsDto {
    mainKeyword: string
    count: number
}

interface GetSubkeywordsResponse {
    mainKeyword: string
    subKeywords: string[]
}
