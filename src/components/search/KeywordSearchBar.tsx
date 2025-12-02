'use client'

import { useEffect, useRef, useState } from 'react'
import { PopularKeywords } from './PopularKeywords'
import { KeywordInput } from './KeywordInput'
import { KeywordsCurrent } from './KeywordsCurrent'
import { KeywordsRecommend } from './KeywordsRecommend'
import { MAX_KEYWORDS } from '@/constants/common'
import { useAuthStore, useGraphStore, useSearchStore } from '@/stores'
import { useRequestNewTree } from '@/hooks'

export const KeywordSearchBar = () => {
    const [inputValue, setInputValue] = useState('')

    const accessToken = useAuthStore((state) => state.accessToken)
    const keywords = useSearchStore((state) => state.keywords)
    const setKeywords = useSearchStore((state) => state.setKeywords)
    const setIsGraphLoading = useGraphStore((state) => state.setIsGraphLoading)

    const inputRef = useRef<HTMLInputElement>(null)

    const mainKeyword = keywords.length > 0 ? keywords[0] : null
    const subKeywords = keywords.length > 1 ? keywords.slice(1) : []

    const { mutateAsync: getGraph, isPending: isGraphPending } = useRequestNewTree()

    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    const addKeyword = (kw: string) => {
        const newKw = kw.trim()
        if (newKw && !keywords.includes(newKw) && keywords.length < MAX_KEYWORDS) {
            setKeywords([...keywords, newKw])
        }
    }

    const addInputKeyword = () => {
        addKeyword(inputValue)
        setInputValue('')
    }

    const removeKeyword = (keywordToRemove: string) => {
        setKeywords(keywords.filter((keyword) => keyword !== keywordToRemove))
    }

    const handleSearch = async () => {
        if (!accessToken || isGraphPending) return
        if (!mainKeyword) return

        setIsGraphLoading(true)
        try {
            await getGraph({
                mainKeyword,
                subKeywords,
            })
        } catch (error) {
            console.error('분석 요청 실패:', error)
        } finally {
            setIsGraphLoading(false)
        }
    }

    return (
        <div className="flex flex-row w-full max-w-2xl gap-2">
            <PopularKeywords />

            <div className="w-full p-4 rounded-2xl bg-neutral-50 border border-neutral-100 shadow-lg">
                <KeywordInput
                    inputRef={inputRef}
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    addInputKeyword={addInputKeyword}
                    isGraphLoading={isGraphPending}
                    handleSearch={handleSearch}
                />

                <KeywordsRecommend addKeyword={addKeyword} />
                <KeywordsCurrent onRemove={removeKeyword} />
            </div>
        </div>
    )
}
