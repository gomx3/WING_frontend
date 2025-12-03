import clsx from 'clsx'
import { X } from 'lucide-react'
import { MenuTab } from './Sidebar'
import { MyInvestment } from './MyInvestment'
import { MyGraphList } from './MyGraphList'

interface SlideMenuProps {
    showMenu: boolean
    toggleMenu: () => void
    activeTab: MenuTab
}

export const SlideMenu = ({ showMenu, toggleMenu, activeTab }: SlideMenuProps) => {
    return (
        <div
            className={clsx(
                'flex-shrink-0 overflow-hidden bg-neutral-100 border-neutral-200 whitespace-nowrap',
                showMenu ? 'border-r transition-[width] duration-300 w-[18rem] h-full px-4 py-6' : 'w-0 p-0'
            )}
        >
            <div className="w-full flex flex-row justify-between mb-6">
                <div className="font-bold text-neutral-600 tracking-[-0.4px]">
                    {activeTab === 'investment' ? '내 투자' : '내 그래프 목록'}
                </div>

                <button
                    aria-label="슬라이드 메뉴 닫기"
                    onClick={toggleMenu}
                    className={clsx('cursor-pointer text-neutral-400 hover:text-neutral-600', !showMenu && 'hidden')}
                >
                    <X />
                </button>
            </div>

            {activeTab === 'investment' ? <MyInvestment /> : <MyGraphList />}
        </div>
    )
}
