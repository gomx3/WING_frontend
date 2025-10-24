'use client'

import { useGraphStore } from '@/stores/graphStore'
import { ArticleItem } from './ArticleItem'
import { ArticlePanelPlaceholder } from './ArticlePlaceholder'
import { ARTICLES } from './dummy'

export const ArticlePanel = () => {
    const { graphData } = useGraphStore()
    const hasGraphData = graphData && graphData.links.length > 0

    if (!hasGraphData) {
        return <ArticlePanelPlaceholder />
    }

    return (
        <div className="w-[32rem] h-full px-8 py-6 space-y-8 border-l border-neutral-200 overflow-y-auto">
            <div className="space-y-2">
                <p className="px-2 py-1 rounded-[0.5rem] w-fit text-[0.8rem] tracking-[-0.4px] text-primary-600 border border-neutral-300">
                    최근 3개월
                </p>
                <h3 className="text-neutral-700 font-bold text-[1.4rem] tracking-[-0.5px]">{`노드 A, 노드 B 관련 기사`}</h3>
                <p className="text-[0.875rem] tracking-[-0.45px] text-neutral-600">
                    최근 3개월 동안 7개의 기사에서 함께 언급되었습니다.
                </p>
            </div>

            <hr className="border-neutral-200" />

            <div className="space-y-4">
                {ARTICLES.map((article, idx) => (
                    <ArticleItem key={idx} article={article} />
                ))}
            </div>
        </div>
    )
}
