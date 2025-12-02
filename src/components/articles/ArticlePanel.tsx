'use client'

import { useGraphStore } from '@/stores/graphStore'
import { ArticleItem } from './ArticleItem'
import { ArticlePanelPlaceholder } from './ArticlePlaceholder'
import { NoArticle } from './NoArticle'
import { useGetEdges, useGetNewsByEdge } from '@/hooks'
import { useEffect, useMemo, useRef } from 'react'
import { formatNumber } from '@/utils/format'
import { ArticleSkeleton } from './ArticleSkeleton'

export const ArticlePanel = () => {
    const selectedGraphId = useGraphStore((state) => state.selectedGraphId)
    const selectedLink = useGraphStore((state) => state.selectedLink)

    const { data: edgesData } = useGetEdges(selectedGraphId)

    const currentEdge = useMemo(() => {
        if (!edgesData || !selectedLink) return null
        return edgesData.find(
            (edge) => edge.startPoint === selectedLink.source && edge.endPoint === selectedLink.target
        )
    }, [edgesData, selectedLink])

    const { data: newsData, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetNewsByEdge({ take: 20 })

    const loadRef = useRef<HTMLDivElement | null>(null)

    // 무한 스크롤 Observer
    useEffect(() => {
        if (!loadRef.current) return

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage()
                }
            },
            { threshold: 1 }
        )

        observer.observe(loadRef.current)

        return () => {
            observer.disconnect()
        }
    }, [hasNextPage, isFetchingNextPage, fetchNextPage])

    if (!selectedLink || !currentEdge) {
        return <ArticlePanelPlaceholder />
    }

    if (isLoading || !newsData) {
        return <ArticleSkeleton />
    }

    const flatItems = newsData.pages.flatMap((page) => page.items)

    return (
        <div className="w-[36rem] h-full px-8 py-6 border-l border-neutral-200 overflow-y-auto">
            <div className="space-y-2">
                <h3 className="text-neutral-700 font-bold text-[1.4rem] tracking-[-0.5px]">
                    {`${selectedLink.source}, ${selectedLink.target} 관련 기사`}
                </h3>
                <p className="text-sm tracking-[-0.45px] text-neutral-600">
                    {`함께 언급된 ${formatNumber(currentEdge.totalEstimated)}개의 기사 중 `}
                    <span className="font-medium text-primary-600">
                        최신 {formatNumber(currentEdge.collectedCount)}개
                    </span>
                    의 기사입니다.
                </p>
            </div>

            <hr className="my-8 border-neutral-200" />

            <div className="space-y-4">
                {flatItems.length > 0 ? (
                    flatItems.map((article) => <ArticleItem key={article.id} article={article} />)
                ) : (
                    <NoArticle />
                )}
            </div>

            <div ref={loadRef} className="h-4" />
            {isFetchingNextPage && <p className="text-center text-neutral-500 text-sm py-2">불러오는 중...</p>}
        </div>
    )
}
