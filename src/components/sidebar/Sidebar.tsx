'use client'

import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import { ChartArea, ChartNetwork, ChevronsRight } from 'lucide-react'
import { TabButton } from './TabButton'
import { SlideMenu } from './SlideMenu'
import { useAuthStore } from '@/stores/authStore'
import { useMediaQuery } from '@/hooks'

export type MenuTab = 'investment' | 'graph'

export const Sidebar = () => {
    const isDesktop = useMediaQuery('(min-width: 1024px)')
    const pathname = usePathname()

    const [showMenu, setShowMenu] = useState(false)
    const [activeTab, setActiveTab] = useState<MenuTab>('graph')

    const accessToken = useAuthStore((state) => state.accessToken)

    useEffect(() => {
        if (!accessToken || pathname.startsWith('/auth/signup')) {
            setShowMenu(false)
            return
        }

        if (isDesktop) setShowMenu(true)
        else setShowMenu(false)
    }, [isDesktop, pathname, accessToken])

    const toggleMenu = () => setShowMenu(!showMenu)

    const handleTabClick = (tab: MenuTab) => {
        setActiveTab(tab)
        if (!showMenu) setShowMenu(true)
    }

    return (
        <div className="flex h-screen">
            <aside className="flex flex-col items-center w-[3.785rem] px-2 py-6 gap-2 bg-neutral-100 border-r border-neutral-200">
                <button onClick={toggleMenu} className="mb-6 text-neutral-400 cursor-pointer">
                    <ChevronsRight
                        className={clsx('transition-transform duration-300 ease-in-out', showMenu && 'rotate-180')}
                    />
                </button>

                <TabButton
                    label="그래프"
                    handleClick={() => handleTabClick('graph')}
                    isActive={activeTab === 'graph' && showMenu}
                >
                    <ChartNetwork />
                </TabButton>

                <TabButton
                    label="내 투자"
                    handleClick={() => handleTabClick('investment')}
                    isActive={activeTab === 'investment' && showMenu}
                >
                    <ChartArea />
                </TabButton>
            </aside>

            <SlideMenu showMenu={showMenu} toggleMenu={toggleMenu} activeTab={activeTab} />
        </div>
    )
}
