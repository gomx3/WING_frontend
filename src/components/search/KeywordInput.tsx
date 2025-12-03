import { RefObject } from 'react'
import { Button, Input } from '../common'
import { useSearchStore } from '@/stores'
import { MAX_KEYWORDS } from '@/constants/common'

interface KeywordInputProps {
    inputRef: RefObject<HTMLInputElement | null>
    inputValue: string
    setInputValue: (val: string) => void
    addInputKeyword: () => void
    isGraphLoading: boolean
    handleSearch: () => Promise<void>
}

export const KeywordInput = ({
    inputRef,
    inputValue,
    setInputValue,
    addInputKeyword,
    isGraphLoading,
    handleSearch,
}: KeywordInputProps) => {
    const keywords = useSearchStore((state) => state.keywords)

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            addInputKeyword()
        }
    }

    return (
        <div className="flex w-full items-center space-x-2">
            <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={keywords.length >= MAX_KEYWORDS ? '최대 10개까지 등록 가능합니다' : '키워드 입력 후 Enter'}
                size="lg"
                showIcon={true}
                className="flex-1"
            />
            <Button label="추가" size="lg" onClick={addInputKeyword} variant="outline" />
            <Button
                label={isGraphLoading ? '분석중...' : '분석하기'}
                size="lg"
                onClick={handleSearch}
                variant={isGraphLoading ? 'secondary' : 'primary'}
                disabled={isGraphLoading || keywords.length === 0}
            />
        </div>
    )
}
