import clsx from 'clsx'
import { X } from 'lucide-react'
import Image from 'next/image'

interface SlideMenuProps {
    showMenu: boolean
    toggleMenu: () => void
}

export const SlideMenu = ({ showMenu, toggleMenu }: SlideMenuProps) => {
    return (
        <div
            className={clsx(
                'flex-shrink-0 overflow-hidden bg-neutral-100 border-neutral-200  whitespace-nowrap',
                showMenu ? 'border-r transition-[width] duration-300 w-[16rem] px-4 py-6' : 'w-0 p-0'
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

            <div className={clsx('flex flex-1 justify-center items-center h-full', showMenu ? 'block' : 'hidden')}>
                <div className="flex flex-col justify-center items-center pb-3 gap-4">
                    <div className="p-[0.543rem] rounded-full bg-neutral-200">
                        <Image src="/assets/document.svg" alt="문서 아이콘" width={48} height={48} />
                    </div>
                    <p className="font-medium text-neutral-500 tracking-[-0.4px]">보유 종목이 없어요</p>
                </div>
            </div>
        </div>
    )
}
