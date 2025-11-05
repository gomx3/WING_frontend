'use client'

import { useEffect, useRef, useState } from 'react'
import { Button, Input } from '../common'
import { RecommendedKeywords } from './RecommendedKeywords'
import { KeywordsCurrent } from './KeywordsCurrent'
import { MAX_KEYWORDS } from '@/constants/common'
import { useSearchStore } from '@/stores/searchStore'
import useGetTreeGraph from '@/hooks/queries/useGetTreeGraph'
import { useGraphStore } from '@/stores/graphStore'
import { useAuthStore } from '@/stores/authStore'

export const KeywordSearchBar = () => {
    const [inputValue, setInputValue] = useState('')

    const accessToken = useAuthStore((state) => state.accessToken)
    const keywords = useSearchStore((state) => state.keywords)
    const setKeywords = useSearchStore((state) => state.setKeywords)
    const setIsGraphLoading = useGraphStore((state) => state.setIsGraphLoading)

    const inputRef = useRef<HTMLInputElement>(null)

    const mainKeyword = keywords.length > 0 ? keywords[0] : null
    const subKeywords = keywords.length > 1 ? keywords.slice(1) : []

    const { isLoading: isGraphLoading, refetch } = useGetTreeGraph({
        mainKeyword: mainKeyword || '',
        subKeywords: subKeywords,
        enabled: false,
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
    }

    const handleSearch = async () => {
        if (!accessToken) {
            alert('로그인이 필요한 기능입니다.')
            return
        }

        if (keywords.length > 0) {
            setIsGraphLoading(true)
            await refetch()
            setIsGraphLoading(false)
        }
    }

    return (
        <div className="w-[32rem] p-4 space-y-8 rounded-[1.25rem] bg-neutral-50 border border-neutral-100">
            <div className="flex w-full items-center space-x-2">
                <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={
                        keywords.length >= MAX_KEYWORDS ? '최대 10개까지 등록 가능합니다' : '키워드 입력 후 Enter'
                    }
                    size="lg"
                    showIcon={true}
                    className="flex-1"
                />

                <Button
                    label={isGraphLoading ? '분석중...' : '분석하기'}
                    size="lg"
                    onClick={handleSearch}
                    variant={isGraphLoading ? 'secondary' : 'primary'}
                    disabled={isGraphLoading || keywords.length === 0}
                />
            </div>

            <KeywordsCurrent onRemove={removeKeyword} />
            <RecommendedKeywords />
        </div>
    )
}
