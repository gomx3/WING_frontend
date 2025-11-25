import { Stock } from '@/types/my'
import SVGDocument from '@/assets/document.svg'

export const StockList = ({ stocks, onRemove }: { stocks: Stock[]; onRemove: (id: string) => void }) => {
    if (stocks.length === 0) {
        return (
            <>
                <div className="p-[0.543rem] rounded-full bg-neutral-200">
                    <SVGDocument className="w-12 h-12" />
                </div>
                <p className="font-medium text-neutral-500 tracking-[-0.4px]">보유 종목이 없어요</p>
            </>
        )
    }

    return (
        <div className="flex flex-col gap-2 w-full">
            {stocks.map((stock) => (
                <div key={stock.id} className="flex justify-between items-center border rounded p-2">
                    <div>
                        <p className="font-medium">
                            {stock.name} ({stock.ticker})
                        </p>
                        <p className="text-sm text-neutral-500">수량: {stock.amount}</p>
                    </div>
                    <button onClick={() => onRemove(stock.id)} className="text-red-500">
                        삭제
                    </button>
                </div>
            ))}
        </div>
    )
}
