import clsx from 'clsx'
import { X } from 'lucide-react'
import { InvestModeController } from './InvestModeController'
import { useState } from 'react'
import { Stock } from '@/types/my'
import { StockList } from './StockList'

interface SlideMenuProps {
    showMenu: boolean
    toggleMenu: () => void
}

export const SlideMenu = ({ showMenu, toggleMenu }: SlideMenuProps) => {
    const [stocks, setStocks] = useState<Stock[]>([])

    // const handleAddStock = (stock: Stock) => setStocks((prev) => [...prev, stock])
    const handleRemoveStock = (id: string) => setStocks((prev) => prev.filter((s) => s.id !== id))

    return (
        <div
            className={clsx(
                'flex-shrink-0 overflow-hidden bg-neutral-100 border-neutral-200  whitespace-nowrap',
                showMenu ? 'border-r transition-[width] duration-300 w-[16rem] h-full px-4 py-6' : 'w-0 p-0'
            )}
        >
            <div className="w-full flex flex-row justify-between">
                <div className="font-bold text-neutral-600 tracking-[-0.4px]">내 투자</div>

                <button
                    aria-label="슬라이드 메뉴 닫기"
                    onClick={toggleMenu}
                    className={clsx('cursor-pointer text-neutral-400', !showMenu && 'hidden')}
                >
                    <X />
                </button>
            </div>

            {/* 종목 투자 모드 (임시) */}
            <InvestModeController showMenu={showMenu} />
            {/* ------ */}
            <div className={clsx('flex flex-1 justify-center items-center h-full', showMenu ? 'block' : 'hidden')}>
                <div className="flex flex-col justify-center items-center pb-28 gap-4">
                    <StockList stocks={stocks} onRemove={handleRemoveStock} />
                </div>
            </div>
        </div>
    )
}
