import { MAX_KEYWORDS } from '@/constants/common'
import { Tag } from './Tag'
import { useSearchStore } from '@/stores/searchStore'

interface KeywordsCurrentProps {
    onRemove: (keyword: string) => void
}

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
