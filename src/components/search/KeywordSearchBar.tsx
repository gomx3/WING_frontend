'use client'

import { useEffect, useRef, useState } from 'react'
import { Input } from '../common'
import { RecommendedKeywords } from './RecommendedKeywords'
import { KeywordsCurrent } from './KeywordsCurrent'
import { MAX_KEYWORDS } from '@/constants/common'
import { useSearchStore } from '@/stores/searchStore'
import useGetTreeGraph from '@/hooks/useGetTreeGraph'

/**
 * 메인 키워드 1개와 서브 키워드 N개를 입력받는 검색 바 UI
 * - 첫 번째 입력된 키워드가 '메인 키워드'
 * - 이후 키워드들은 '서브 키워드'로 취급
 * - 키워드 변경 시 useGetTreeGraph 훅을 통해 Graph Data Fetch 수행
 * - 키워드 상태는 searchStore로 전역 관리
 *
 * @component
 *
 * @example
 * <KeywordSearchBar />
 */
export const KeywordSearchBar = () => {
    const [inputValue, setInputValue] = useState('')

    const { keywords, setKeywords } = useSearchStore()

    const inputRef = useRef<HTMLInputElement>(null)

    const mainKeyword = keywords.length > 0 ? keywords[0] : null
    const subKeywords = keywords.length > 1 ? keywords.slice(1) : []

    const { data: treeGraph, isLoading: isGraphLoading } = useGetTreeGraph({
        mainKeyword: mainKeyword || '',
        subKeywords: subKeywords,
        enabled: !!mainKeyword,
    })

    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    const addKeyword = () => {
        const newKeyword = inputValue.trim()
        if (newKeyword && !keywords.includes(newKeyword) && keywords.length < MAX_KEYWORDS) {
            setKeywords([...keywords, newKeyword])
            setInputValue('')
        }
    }

    const removeKeyword = (keywordToRemove: string) => {
        setKeywords(keywords.filter((keyword) => keyword !== keywordToRemove))
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            addKeyword()
        }
        // if (e.key === 'Backspace' && inputValue === '' && keywords.length > 0) {
        //     removeKeyword(keywords[keywords.length - 1])
        // }
    }

    return (
        <div className="w-[32rem] p-4 space-y-8 rounded-[1.25rem] bg-neutral-50 border border-neutral-100">
            <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={keywords.length >= MAX_KEYWORDS ? '최대 10개까지 등록 가능합니다' : '키워드 입력 후 Enter'}
                size="lg"
                showIcon={true}
                className="w-full"
            />

            <KeywordsCurrent onRemove={removeKeyword} />
            <RecommendedKeywords />
        </div>
    )
}
