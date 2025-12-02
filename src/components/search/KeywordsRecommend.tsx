import { useGetSubKeywords } from '@/hooks'
import { useSearchStore } from '@/stores/searchStore'
import { useEffect, useState } from 'react'

interface KeywordsRecommendProps {
    addKeyword: (kw: string) => void
}

export const KeywordsRecommend = ({ addKeyword }: KeywordsRecommendProps) => {
    const [recommended, setRecommended] = useState<string[]>([])

    const keywords = useSearchStore((state) => state.keywords)

    const mainKeyword = keywords.length > 0 ? keywords[0] : null

    const { mutateAsync: getSubKeywords, isPending: isLoadingSub } = useGetSubKeywords()

    useEffect(() => {
        const fetchRecommended = async () => {
            if (!mainKeyword) {
                setRecommended([])
                return
            }
            try {
                const data = await getSubKeywords({
                    mainKeyword,
                    count: 7,
                })
                setRecommended(data.subKeywords ?? [])
            } catch (e) {
                console.error('추천 키워드 불러오기 실패', e)
            }
        }
        fetchRecommended()
    }, [mainKeyword, getSubKeywords])

    return (
        <>
            {mainKeyword && (
                <div className="mt-3 min-h-[2rem]">
                    {isLoadingSub ? (
                        <p className="text-sm text-neutral-400 tracking-[-0.4px] pl-1">연관 키워드 찾는 중...</p>
                    ) : recommended.length > 0 ? (
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-neutral-500 tracking-[-0.4px] pl-1">
                                '{mainKeyword}' 관련 추천 키워드
                            </p>
                            <div className="flex flex-wrap">
                                {recommended.map((kw, idx) => (
                                    <button
                                        key={idx}
                                        className="px-2 py-1 rounded-full text-primary-300 text-sm hover:bg-primary-800 transition-colors duration-200 cursor-pointer"
                                        onClick={() => addKeyword(kw)}
                                    >
                                        + {kw}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : null}
                </div>
            )}
        </>
    )
}
