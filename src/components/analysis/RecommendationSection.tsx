import React from 'react'
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar, Cell, Tooltip } from 'recharts'
import { ChartSkeleton } from './ChartSkeleton'
import { UseQueryResult } from '@tanstack/react-query'

interface Props {
    data: UseQueryResult<
        {
            stockName: string
            chartData: {
                name: string
                value: number
                fill: string
            }[]
        },
        Error
    >
}

/**
 * 애널리스트 투자의견 차트 섹션 컴포넌트
 *
 * @component
 * @description Finnhub 등에서 제공하는 전문가들의 매수/매도 의견 분포를 가로 막대 그래프로 보여줍니다.
 * - Strong Buy, Buy, Hold, Sell, Strong Sell 등의 카테고리를 시각화합니다.
 *
 * @param {Props} props
 * @returns {JSX.Element} 투자의견 차트 섹션
 */
export const RecommendationSection = ({ data }: Props) => {
    const chartData = data.data?.chartData

    return (
        <section>
            <h3 className="text-sm font-semibold text-neutral-600 mb-3">전문가 투자의견</h3>
            <div className="h-32 w-full text-xs">
                {chartData ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} layout="vertical">
                            <XAxis type="number" hide />
                            <YAxis dataKey="name" type="category" width={80} tick={{ fill: '#888888', fontSize: 11 }} />
                            <Tooltip cursor={{ fill: '#ddd' }} />
                            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <ChartSkeleton sizeConfig="h-32" />
                )}
            </div>
        </section>
    )
}
