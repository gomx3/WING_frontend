import { MAX_KEYWORDS } from '@/constants/common'
import { SearchGuide } from './SearchGuide'
import { Tag } from './Tag'
import { useSearchStore } from '@/stores/searchStore'
import { X } from 'lucide-react'

interface KeywordsCurrentProps {
    onRemove: (keyword: string) => void
}

/**
 * 선택된 현재 키워드 리스트를 보여주는 컴포넌트
 * - 상단에 (현재 키워드 개수 / 최대 키워드 개수)로 표시함
 * - 메인 키워드와 서브 키워드가 분리되어 렌더링 되고
 * - 삭제(onRemove) 가능
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

    const mainKeyword = keywords.length > 0 ? keywords[0] : null
    const subKeywords = keywords.length > 1 ? keywords.slice(1) : []

    return (
        <div className="mt-8">
            {keywords && keywords.length > 0 ? (
                <div className="flex flex-col gap-3">
                    <label className="text-sm font-medium text-neutral-600 tracking-[-0.4px] pl-1">
                        분석할 키워드 ({keywords.length} / {MAX_KEYWORDS})
                    </label>

                    {mainKeyword && (
                        <div className="flex items-center justify-between p-3 rounded-xl border border-neutral-300">
                            <div className="flex items-center gap-3">
                                <span className="px-2 py-1 text-[10px] font-bold text-white bg-primary-600 rounded-md tracking-wider">
                                    MAIN
                                </span>
                                <span className="text-base font-semibold text-neutral-800">{mainKeyword}</span>
                            </div>
                            <button
                                onClick={() => onRemove(mainKeyword)}
                                className="text-neutral-400 hover:text-primary-500 transition-colors cursor-pointer"
                            >
                                <X size={18} />
                            </button>
                        </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                        {subKeywords.map((kw) => (
                            <Tag key={kw} text={kw} onRemove={onRemove} />
                        ))}
                    </div>
                </div>
            ) : (
                <SearchGuide />
            )}
        </div>
    )
}
