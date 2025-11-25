'use client'

import { Landing } from '@/components'
import { ArticlePanel } from '@/components/articles'
import { WeightGraphPanel } from '@/components/graph'
import { useGetNews } from '@/hooks'
import { useAuthStore } from '@/stores/authStore'

export default function Home() {
    const accessToken = useAuthStore((state) => state.accessToken)

    const { data: newsData, isLoading: isNewsLoading } = useGetNews()

    if (!accessToken) return <Landing />

    return (
        <div className="flex flex-row justify-between h-full">
            <WeightGraphPanel newsData={newsData} />
            <ArticlePanel newsData={newsData} isLoading={isNewsLoading} />
        </div>
    )
}
