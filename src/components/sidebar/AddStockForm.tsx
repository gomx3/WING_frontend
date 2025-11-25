import { Stock } from '@/types/my'
import { useState } from 'react'

export const AddStockForm = ({ onAdd }: { onAdd: (stock: Stock) => void }) => {
    const [name, setName] = useState('')
    const [ticker, setTicker] = useState('')
    const [amount, setAmount] = useState<number>(0)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!name || !ticker || amount <= 0) return
        onAdd({ id: Date.now().toString(), name, ticker, amount })
        setName('')
        setTicker('')
        setAmount(0)
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
            <input
                type="text"
                placeholder="종목명"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-1 rounded"
            />
            <input
                type="text"
                placeholder="티커"
                value={ticker}
                onChange={(e) => setTicker(e.target.value)}
                className="border p-1 rounded"
            />
            <input
                type="number"
                placeholder="수량"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="border p-1 rounded"
            />
            <button type="submit" className="bg-primary-600 text-white rounded p-1 mt-1">
                추가
            </button>
        </form>
    )
}
