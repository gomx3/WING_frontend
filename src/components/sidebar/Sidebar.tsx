'use client'

import { ChartArea, ChevronsRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { SlideMenu } from './SlideMenu'
import { useMediaQuery } from '@/hooks/useMediaQuery'

export const Sidebar = () => {
    const isDesktop = useMediaQuery('(min-width: 1024px)')

    const [showMenu, setShowMenu] = useState(false)

    useEffect(() => {
        if (isDesktop) setShowMenu(true)
        else setShowMenu(false)
    }, [isDesktop])

    const toggleMenu = () => setShowMenu(!showMenu)

    return (
        <div className="flex h-screen">
            <aside className="flex flex-col items-center w-[3.785rem] px-2 py-6 gap-8 bg-neutral-100 border-r border-neutral-200">
                <button onClick={toggleMenu} className="text-neutral-400 cursor-pointer">
                    <ChevronsRight />
                </button>

                <button onClick={toggleMenu} className="space-y-1">
                    <div className="flex justify-center items-center aspect-square rounded-[0.5rem] border border-neutral-300 hover:bg-neutral-200 text-neutral-500 cursor-pointer transition-colors duration-100">
                        <ChartArea />
                    </div>

                    <p className="text-[0.875rem] tracking-[-0.45px]">내 투자</p>
                </button>
            </aside>

            <SlideMenu showMenu={showMenu} toggleMenu={toggleMenu} />
        </div>
    )
}
