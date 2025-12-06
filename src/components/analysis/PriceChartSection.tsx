import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ChartSkeleton } from './ChartSkeleton'
import { UseQueryResult } from '@tanstack/react-query'
import { PriceMaResponse } from '@/types/analysis'

interface Props {
    data: UseQueryResult<PriceMaResponse, Error>
}

/**
 * 주가 및 이동평균선(MA) 차트 섹션 컴포넌트
 *
 * @component
 * @description 최근 30일간의 종가(Close), 20일 이동평균선, 60일 이동평균선을 라인 차트로 시각화합니다.
 * - 툴팁에서 소수점 1자리까지 포맷팅하여 보여줍니다.
 * - 데이터가 로딩 중이거나 없을 경우 스켈레톤을 표시합니다.
 *
 * @param {Props} props
 * @returns {JSX.Element} 주가 차트 섹션
 */
export const PriceChartSection = ({ data }: Props) => {
    return (
        <section>
            <h3 className="text-sm font-semibold text-neutral-600 mb-3">주가 & 이동평균선 (30일)</h3>
            <div className="h-32 w-full text-xs">
                {data.data ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data.data}>
                            <XAxis dataKey="date" hide />
                            <YAxis domain={['auto', 'auto']} hide />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="close"
                                stroke="#222222"
                                strokeWidth={2}
                                dot={false}
                                name="종가"
                            />
                            <Line
                                type="monotone"
                                dataKey="ma20"
                                stroke="#e2ac21" // Amber
                                strokeWidth={1.5}
                                dot={false}
                                name="20일선"
                            />
                            <Line
                                type="monotone"
                                dataKey="ma60"
                                stroke="#38bdf8" // Sky
                                strokeWidth={1.5}
                                dot={false}
                                name="60일선"
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#fff' }}
                                labelStyle={{ color: '#666' }}
                                formatter={(value: number) => [
                                    value.toLocaleString('ko-KR', {
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 6,
                                    }),
                                ]}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <ChartSkeleton />
                )}
            </div>
        </section>
    )
}
