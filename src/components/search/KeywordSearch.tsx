'use client'

import { useEffect } from 'react'
import { KeywordSearchBar } from './KeywordSearchBar'
import { useSearchStore } from '@/stores/searchStore'

/**
 * 검색 창 모달의 루트 컴포넌트
 * - searchStore의 isSearchOpen 상태에 따라 열림/닫힘 관리
 * - ESC Key 로 검색창을 닫을 수 있음
 * - overlay 영역을 클릭해도 검색창이 닫힘
 *
 * @component
 *
 * @example
 * <KeywordSearch />
 */
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
            <div onClick={toggleSearch} className="fixed inset-0 w-full h-full z-10 bg-neutral-400/30" />

            <div className="absolute flex justify-center items-center w-full z-20 pt-0 px-4">
                <KeywordSearchBar />
            </div>
        </div>
    )
}
