export interface GetSubkeywordsDto {
    mainKeyword: string
    count: number
}

export interface GetSubkeywordsResponse {
    mainKeyword: string
    subKeywords: string[]
}

export interface KeywordCount {
    name: string
    count: number
}

export type TopKeywordsResponse = KeywordCount[]
