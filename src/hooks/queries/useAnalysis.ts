import { useQuery } from '@tanstack/react-query'
import { getAnalysisSymbol, getPriceMa, getRsi, getMomentum, getRecommendation, getCompanyNews } from '@/api/analysis'
import { MomentumItem, RsiItem } from '@/types/analysis'

export const useStockAnalysis = (graphId: number | null) => {
    const { data: symbolData, isLoading: isSymbolLoading } = useQuery({
        queryKey: ['analysis', 'symbol', graphId],
        queryFn: () => getAnalysisSymbol(graphId!),
        enabled: !!graphId,
        staleTime: Infinity,
    })

    const symbol = symbolData?.symbol
    const isDomestic = symbolData?.isDomestic ?? false

    const commonOptions = {
        enabled: !!symbol,
        staleTime: 180 * 60 * 1000, // API 호출 제한으로 인해 개발하는 동안은 180분으로 설정
    }

    // 1. Price & MA
    const priceMa = useQuery({
        queryKey: ['analysis', 'price-ma', symbol, isDomestic],
        queryFn: () => getPriceMa(symbol!, isDomestic),
        ...commonOptions,
    })

    // 2. RSI
    const rsi = useQuery({
        queryKey: ['analysis', 'rsi', symbol, isDomestic],
        queryFn: () => getRsi(symbol!, isDomestic),
        select: (data) => {
            if (!Array.isArray(data)) return []

            return data.map((item: RsiItem) => ({
                date: item.date,
                value: item.rsi,
            }))
        },
        ...commonOptions,
    })

    // 3. Momentum
    const momentum = useQuery({
        queryKey: ['analysis', 'momentum', symbol, isDomestic],
        queryFn: () => getMomentum(symbol!, isDomestic),
        select: (data) => {
            if (!Array.isArray(data)) return []

            return data.map((item: MomentumItem) => ({
                date: item.date,
                value: item.mom,
            }))
        },
        ...commonOptions,
    })

    // 4. Recommendation: Recharts용 배열로 변환
    const recommendation = useQuery({
        queryKey: ['analysis', 'recommendation', symbol, isDomestic],
        queryFn: () => getRecommendation(symbol!, isDomestic),
        select: (data) => [
            { name: 'Strong Sell', value: data.strongSell, fill: '#ef4444' },
            { name: 'Sell', value: data.sell, fill: '#f87171' },
            { name: 'Hold', value: data.hold, fill: '#fbbf24' },
            { name: 'Buy', value: data.buy, fill: '#34d399' },
            { name: 'Strong Buy', value: data.strongBuy, fill: '#10b981' },
        ],
        ...commonOptions,
    })

    // 5. News
    const news = useQuery({
        queryKey: ['analysis', 'news', symbol, isDomestic],
        queryFn: () => getCompanyNews(symbol!, isDomestic),
        ...commonOptions,
    })

    return {
        symbol,
        isDomestic,
        isSymbolLoading,
        priceMa,
        rsi,
        momentum,
        recommendation,
        news,
    }
}
