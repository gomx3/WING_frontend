import { IndicatorResponse } from '@/types/analysis'
import { UseQueryResult } from '@tanstack/react-query'
import { Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ChartSkeleton } from './ChartSkeleton'

interface Props {
    data: UseQueryResult<IndicatorResponse, Error>
}

/**
 * RSI (상대강도지수) 지표 차트 섹션 컴포넌트
 *
 * @component
 * @description 주식의 과매수/과매도 구간을 파악하기 위한 RSI(Period 14) 지표를 렌더링합니다.
 * - 70선(과매수, 빨강), 30선(과매도, 초록) 기준선을 포함합니다.
 *
 * @param {Props} props
 * @returns {JSX.Element} RSI 차트 섹션
 */
export const RsiChartSection = ({ data }: Props) => {
    return (
        <section>
            <h3 className="text-sm font-semibold text-neutral-600 mb-3">RSI (14)</h3>
            <div className="h-24 w-full text-xs">
                {data.data ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data.data}>
                            <XAxis dataKey="date" hide />
                            <YAxis domain={[0, 100]} hide />
                            <Tooltip contentStyle={{ backgroundColor: '#fff' }} />
                            <ReferenceLine y={70} stroke="#ef4444" strokeDasharray="3 3" />
                            <ReferenceLine y={30} stroke="#16b17d" strokeDasharray="3 3" />
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="#8b5cf6" // Violet
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <ChartSkeleton sizeConfig="h-24" />
                )}
            </div>
        </section>
    )
}
