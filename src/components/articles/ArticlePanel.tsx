'use client'

import { useGraphStore } from '@/stores/graphStore'
import { ArticleItem } from './ArticleItem'
import { ArticlePanelPlaceholder } from './ArticlePlaceholder'
import useGetNews from '@/hooks/queries/useGetNews'
import { useMemo } from 'react'

export const ArticlePanel = () => {
    // 1. [수정] graphData 대신 selectedLink를 가져옴
    const { selectedLink } = useGraphStore()

    // 2. [추가] selectedLink를 기반으로 useGetNews 훅 호출
    // const { data: newsData, isLoading } = useGetNews(selectedLink?.source ?? null, selectedLink?.target ?? null)
    const { data: newsData, isLoading } = useGetNews()

    // 3. [추가] newsData를 selectedLink 기준으로 필터링 (useMemo 사용)
    const filteredNews = useMemo(() => {
        // 데이터가 없거나, 링크가 선택되지 않았으면 빈 배열 반환
        if (!newsData || !selectedLink) {
            return []
        }

        const { source, target } = selectedLink

        // 백엔드 데이터를 기준으로 필터링
        return newsData.filter((article) => {
            // 정방향 체크 (source -> target)
            const matchForward = article.startPoint === source && article.endPoint === target
            // 역방향 체크 (target -> source)
            const matchBackward = article.startPoint === target && article.endPoint === source

            return matchForward || matchBackward
        })
    }, [newsData, selectedLink]) // newsData나 selectedLink가 바뀔 때만 재실행

    // Case 1: 링크가 선택되지 않았을 때
    if (!selectedLink) {
        return <ArticlePanelPlaceholder />
    }

    // Case 2: 링크는 선택되었으나, 데이터 로딩 중일 때
    if (isLoading) {
        // (별도 로딩 컴포넌트가 없다면 ArticlePanelPlaceholder를 재사용)
        return <ArticlePanelPlaceholder />
        // return <ArticleLoadingSpinner /> // 로딩 스피너
    }

    return (
        <div className="w-[32rem] h-full px-8 py-6 space-y-8 border-l border-neutral-200 overflow-y-auto">
            <div className="space-y-2">
                <p className="px-2 py-1 rounded-[0.5rem] w-fit text-[0.8rem] tracking-[-0.4px] text-primary-600 border border-neutral-300">
                    최근 3개월
                </p>
                <h3 className="text-neutral-700 font-bold text-[1.4rem] tracking-[-0.5px]">
                    {`${selectedLink.source}, ${selectedLink.target} 관련 기사`}
                </h3>
                <p className="text-[0.875rem] tracking-[-0.45px] text-neutral-600">
                    {`최근 3개월 동안 ${newsData?.length ?? 0}개의 기사에서 함께 언급되었습니다.`}
                </p>
            </div>

            <hr className="border-neutral-200" />

            <div className="space-y-4">
                {filteredNews && filteredNews.map((article) => <ArticleItem key={article.id} article={article} />)}
            </div>
        </div>
    )
}
