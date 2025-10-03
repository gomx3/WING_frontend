'use client'

import { useEffect, useState } from 'react'
import { Tag } from './Tag'
import { useGraphStore } from '@/stores/graphStore'

const MAX_KEYWORDS = 10

export const KeywordSearchBar = () => {
    const [inputValue, setInputValue] = useState('')
    const [keywords, setKeywords] = useState<string[]>([])

    const { setGraphData, setIsLoading } = useGraphStore()

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
        if (e.key === 'Backspace' && inputValue === '' && keywords.length > 0) {
            removeKeyword(keywords[keywords.length - 1])
        }
    }

    return (
        <div className="w-full max-w-[36rem] p-2 space-y-1 rounded-[0.375rem] bg-[#f6f6f680] backdrop-blur-sm">
            <label className="text-[0.8rem] font-medium text-white-400 block">
                키워드 ({keywords.length} / {MAX_KEYWORDS})
            </label>
            <div className="px-2 py-1 border border-white-500 rounded-md bg-white-700 focus-within:ring-1 focus-within:ring-blue-400">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={keywords.length >= MAX_KEYWORDS ? '최대 10개까지 등록 가능' : '입력 후 Enter'}
                    className="flex-1 bg-transparent outline-none w-full text-[0.875rem] font-medium"
                    disabled={keywords.length >= MAX_KEYWORDS}
                />
            </div>

            {/* tags */}
            <div className="flex flex-row flex-wrap gap-1 justify-center">
                {keywords.map((keyword) => (
                    <Tag key={keyword} text={keyword} onRemove={removeKeyword} />
                ))}
            </div>
        </div>
    )
}
