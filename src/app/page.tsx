'use client'

import { Landing } from '@/components'
import { ArticlePanel } from '@/components/articles'
import { WeightGraphPanel } from '@/components/graph'
import { useAuthStore } from '@/stores/authStore'

export default function Home() {
    const accessToken = useAuthStore((state) => state.accessToken)

    if (!accessToken) return <Landing />

    return (
        <div className="flex flex-row justify-between h-full">
            <WeightGraphPanel />
            <ArticlePanel />
        </div>
    )
}
