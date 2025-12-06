import { IndicatorResponse } from '@/types/analysis'
import { UseQueryResult } from '@tanstack/react-query'
import { Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ChartSkeleton } from './ChartSkeleton'

interface Props {
    data: UseQueryResult<IndicatorResponse, Error>
}

/**
 * Momentum (모멘텀) 지표 차트 섹션 컴포넌트
 *
 * @component
 * @description 주가의 상승/하락 추세 강도를 나타내는 Momentum(Period 10) 지표를 렌더링합니다.
 * - 0선(기준선)을 포함하여 추세의 방향을 쉽게 파악할 수 있습니다.
 *
 * @param {Props} props
 * @returns {JSX.Element} Momentum 차트 섹션
 */
export const MomentumChartSection = ({ data }: Props) => {
    return (
        <section>
            <h3 className="text-sm font-semibold text-neutral-600 mb-3">Momentum (14)</h3>
            <div className="h-24 w-full text-xs">
                {data.data ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data.data}>
                            <XAxis dataKey="date" hide />
                            <YAxis domain={['auto', 'auto']} hide />
                            <Tooltip contentStyle={{ backgroundColor: '#fff' }} />
                            <ReferenceLine y={0} stroke="#9ca3af" />
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="#f0566d" // Pink
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
