import { Minus, Plus } from 'lucide-react'

interface DashBoardHeaderProps {
    isDomestic: boolean
    symbol: string
    isExpanded: boolean
    setIsExpanded: (val: boolean) => void
}

export const DashBoardHeader = ({ isDomestic, symbol, isExpanded, setIsExpanded }: DashBoardHeaderProps) => {
    return (
        <div className="flex justify-between items-start">
            <div className="flex flex-col gap-2">
                <span
                    className={`text-xs w-fit px-2 py-1 rounded-full font-medium ${
                        isDomestic ? 'bg-blue-100 text-blue-600' : 'bg-primary-900 text-primary-600'
                    }`}
                >
                    {isDomestic ? '국내 (KIS)' : '해외 (AlphaVantage)'}
                </span>
                <h2 className="font-semibold text-neutral-800 flex items-center ml-1 gap-2">{symbol} 분석 리포트</h2>
            </div>

            {/* Toggle Button */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1 rounded-md hover:bg-neutral-100 text-neutral-500 transition-colors"
                aria-label={isExpanded ? '접기' : '펼치기'}
            >
                {isExpanded ? <Minus size={20} /> : <Plus size={20} />}
            </button>
        </div>
    )
}
