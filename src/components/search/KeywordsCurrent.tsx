import { MAX_KEYWORDS } from '@/constants/common'
import { Tag } from './Tag'
import { useSearchStore } from '@/stores/searchStore'

interface KeywordsCurrentProps {
    onRemove: (keyword: string) => void
}

/**
 * 선택된 현재 키워드 리스트를 보여주는 컴포넌트
 * - 상단에 (현재 키워드 개수 / 최대 키워드 개수)로 표시함
 * - 각각의 키워드는 Tag 컴포넌트로 렌더링되고 삭제(onRemove) 가능
 *
 * @component
 *
 * @prop {function(string):void} onRemove - 개별 키워드 Remove 버튼 클릭 시 호출되는 handler
 *
 * @example
 * <KeywordsCurrent onRemove={(keyword) => handleRemove(keyword)} />
 */
export const KeywordsCurrent = ({ onRemove }: KeywordsCurrentProps) => {
    const keywords = useSearchStore((state) => state.keywords)

    return (
        <>
            {keywords && keywords.length > 0 && (
                <div className="flex flex-col px-2 gap-3">
                    <label className="text-[0.875rem] font-bold text-neutral-600 tracking-[-0.4px]">
                        키워드 ({keywords.length} / {MAX_KEYWORDS})
                    </label>

                    <div className="flex flex-row flex-wrap gap-1 justify-start">
                        {keywords.map((keyword) => (
                            <Tag key={keyword} text={keyword} onRemove={onRemove} />
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}
