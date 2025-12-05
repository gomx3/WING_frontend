import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface WingScorePanelProps {
    wingScore: number
}

export const WingScorePanel = ({ wingScore }: WingScorePanelProps) => {
    const isPositive = wingScore > 0
    const isZero = wingScore === 0

    const colorClass = isZero
        ? 'text-neutral-600 bg-neutral-100 border-neutral-200'
        : isPositive
        ? 'text-red-600 bg-red-50 border-red-200'
        : 'text-blue-600 bg-blue-50 border-blue-200'

    return (
        <div className="absolute top-4 left-4 z-20 group">
            <div
                className={`flex items-center gap-3 px-3 py-2.5 backdrop-blur-md border rounded-2xl shadow-sm transition-all hover:shadow-md ${colorClass} bg-opacity-90`}
            >
                <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-white/60 shadow-inner`}>
                    {isZero ? <Minus size={18} /> : isPositive ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                </div>

                <div className="flex flex-col leading-none">
                    <span className="text-xs font-bold opacity-70 mb-1">WING SCORE</span>
                    <div className="flex items-end gap-1">
                        <span className="text-2xl font-black tracking-tight">
                            {wingScore > 0 ? `+${wingScore}` : wingScore}
                        </span>
                        <span className="text-xs font-medium opacity-60 mb-1">/ ±100</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
