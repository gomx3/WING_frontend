import { MAX_KEYWORDS } from '@/constants/common'
import { useSearchStore } from '@/stores/searchStore'
import clsx from 'clsx'
import { CornerDownLeft } from 'lucide-react'

const KEYWORDS = [
    { name: 'AI' },
    { name: 'TSLA' },
    { name: 'GPU' },
    { name: '반도체' },
    { name: '삼성전자' },
    { name: '환율' },
    { name: 'NVDA' },
] as const

export const PopularKeywords = () => {
    const { keywords, setKeywords } = useSearchStore()

    return (
        <div className="flex flex-col w-[16rem] h-fit p-4 gap-3  rounded-2xl bg-neutral-50 border border-neutral-100 shadow-lg">
            <p className="text-sm font-bold text-neutral-600 tracking-[-0.4px]">인기 키워드</p>
            <div>
                {KEYWORDS.slice(0, 5).map((keyword, idx) => (
                    <div
                        key={keyword.name}
                        onClick={() => {
                            if (!keywords.includes(keyword.name) && keywords.length < MAX_KEYWORDS) {
                                setKeywords([...keywords, keyword.name])
                            }
                        }}
                        className={clsx(
                            'group flex items-center justify-between px-2 py-[0.375rem] rounded-[0.5rem]',
                            'hover:bg-neutral-100 transition-colors cursor-pointer'
                        )}
                    >
                        <div className="flex items-center space-x-3">
                            <span className="text-primary-600">{idx + 1}</span>
                            <span className="font-medium text-[0.875rem] text-neutral-700">{keyword.name}</span>
                        </div>

                        <div className="opacity-0 group-hover:opacity-100 p-1 bg-neutral-200 rounded-[0.313rem]">
                            <CornerDownLeft size={14} className=" text-neutral-400 transition-opacity duration-150" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
