'use client'

import { ArticlePanel } from '@/components/articles'
import { WeightGraphPanel } from '@/components/graph'
import useGetNews from '@/hooks/queries/useGetNews'

export default function Home() {
    const { data: newsData, isLoading: isNewsLoading } = useGetNews()

    return (
        <div className="flex flex-row justify-between h-full">
            <WeightGraphPanel newsData={newsData} />
            <ArticlePanel newsData={newsData} isLoading={isNewsLoading} />
        </div>
    )
}
