'use client'

import { useEffect, useRef, useState } from 'react'
import { useGraphStore } from '@/stores/graphStore'
import { Input } from '../common'
import { RecommendedKeywords } from './RecommendedKeywords'
import { KeywordsCurrent } from './KeywordsCurrent'
import { MAX_KEYWORDS } from '@/constants/common'
import { useSearchStore } from '@/stores/searchStore'

export const KeywordSearchBar = () => {
    const [inputValue, setInputValue] = useState('')

    const { keywords, setKeywords } = useSearchStore()
    const { setGraphData, setIsLoading } = useGraphStore()

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    useEffect(() => {
        const fetchGraphData = async () => {
            if (keywords.length === 0) {
                setGraphData({ nodes: [], links: [] })
                return
            }

            setIsLoading(true)
            try {
                const response = await fetch(`/api/graph?keywords=${keywords.join(',')}`)
                const data = await response.json()
                setGraphData(data)
            } catch (error) {
                console.error('Failed to fetch graph data:', error)
                setGraphData({ nodes: [], links: [] }) // 에러 발생 시 데이터 초기화
            } finally {
                setIsLoading(false)
            }
        }

        fetchGraphData()
    }, [keywords, setGraphData, setIsLoading])

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
