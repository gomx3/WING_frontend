export interface AnalysisSymbolResponse {
    graphId: number
    mainKeyword: string
    allKeywords: string[]
    symbol: string
    isDomestic: boolean
}

export interface PriceMaItem {
    date: string
    close: number
    ma20: number | null
    ma60: number | null
}
export type PriceMaResponse = PriceMaItem[]

export interface RsiItem {
    date: string
    rsi: number
}
export type RsiResponse = RsiItem[]

export interface MomentumItem {
    date: string
    mom: number
}
export type MomentumResponse = MomentumItem[]

export interface IndicatorItem {
    date: string
    value: number
}

export type IndicatorResponse = IndicatorItem[]

export interface RecommendationResponse {
    buy: number
    hold: number
    sell: number
    strongBuy: number
    strongSell: number
    period: string
    symbol: string
}

export interface CompanyNewsItem {
    category: string
    datetime: number
    headline: string
    id: number
    image: string
    related: string
    source: string
    summary: string
    url: string
}

export type CompanyNewsResponse = CompanyNewsItem[]

export interface WingScoreResponse {
    graphId: number
    wingScore: number
}

export interface TransformedRecommendationItem {
    chartData: {
        name: string
        value: number
        fill: string
    }[]
    stockName: string
}
