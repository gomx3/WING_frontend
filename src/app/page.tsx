import { ArticlePanel } from '@/components/articles'
import { WeightGraphPanel } from '@/components/graph'

export default function Home() {
    return (
        <div className="flex flex-col desktop:flex-row justify-between h-full">
            <WeightGraphPanel />
            <ArticlePanel />
        </div>
    )
}
