'use client'

import { useEffect } from 'react'
import { KeywordSearchBar } from './KeywordSearchBar'
import { useSearchStore } from '@/stores/searchStore'

export const KeywordSearch = () => {
    const { isSearchOpen, toggleSearch } = useSearchStore()

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                toggleSearch()
            }
        }
        window.addEventListener('keydown', handleEsc)
        return () => window.removeEventListener('keydown', handleEsc)
    }, [toggleSearch])

    return (
        <div className={isSearchOpen ? 'block' : 'hidden'}>
            {/* overlay */}
            <div onClick={toggleSearch} className="fixed inset-0 w-full h-full z-10 bg-neutral-400/20" />

            <div className="absolute flex justify-center items-center w-full z-20 pt-0 px-4">
                <KeywordSearchBar />
            </div>
        </div>
    )
}
