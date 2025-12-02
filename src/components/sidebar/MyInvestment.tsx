import clsx from 'clsx'
import { StockList } from './StockList'
import { useState } from 'react'
import { Stock } from '@/types/my'

export const MyInvestment = () => {
    const [stocks, setStocks] = useState<Stock[]>([])
    const handleRemoveStock = (id: string) => setStocks((prev) => prev.filter((s) => s.id !== id))

    return (
        <div className="flex flex-1 justify-center items-center h-full">
            <div className="flex flex-col justify-center items-center pb-28 gap-4">
                <StockList stocks={stocks} onRemove={handleRemoveStock} />
            </div>
        </div>
    )
}
