import {
    AnalysisSymbolResponse,
    CompanyNewsResponse,
    MomentumResponse,
    PriceMaResponse,
    RecommendationResponse,
    RsiResponse,
    WingScoreResponse,
} from '@/types/analysis'
import { axiosInstance } from './axios'

// 1. 심볼 추론
export const getAnalysisSymbol = async (graphId: number): Promise<AnalysisSymbolResponse> => {
    const { data } = await axiosInstance.get(`/analysis/graphs/${graphId}/symbol`)
    return data
}

// 2. 가격 및 이동평균선
export const getPriceMa = async (symbol: string, isDomestic: boolean): Promise<PriceMaResponse> => {
    const { data } = await axiosInstance.get(`/analysis/price-ma`, { params: { symbol, isDomestic } })
    return data
}

// 3. RSI
export const getRsi = async (symbol: string, isDomestic: boolean): Promise<RsiResponse> => {
    const { data } = await axiosInstance.get(`/analysis/rsi`, { params: { symbol, isDomestic } })
    return data
}

// 4. Momentum
export const getMomentum = async (symbol: string, isDomestic: boolean): Promise<MomentumResponse> => {
    const { data } = await axiosInstance.get(`/analysis/momentum`, { params: { symbol, isDomestic } })
    return data
}

// 5. 추천 의견
export const getRecommendation = async (symbol: string, isDomestic: boolean): Promise<RecommendationResponse> => {
    const { data } = await axiosInstance.get(`/analysis/recommendation`, { params: { symbol, isDomestic } })
    return data
}

// 6. 뉴스
export const getCompanyNews = async (symbol: string, isDomestic: boolean): Promise<CompanyNewsResponse> => {
    const { data } = await axiosInstance.get(`/analysis/company-news`, { params: { symbol, isDomestic } })
    return data
}

// WING-score
export const getWingScore = async (graphId: number): Promise<WingScoreResponse> => {
    const { data } = await axiosInstance.get(`/user/${graphId}/wing-score`)
    return data
}
