import { ArticlePanel } from '@/components/articles'
import { WeightGraphPanel } from '@/components/graph'

export default function Home() {
    return (
        <div className="flex flex-row justify-between h-full">
            <WeightGraphPanel />
            <ArticlePanel />
        </div>
    )
}
{
    /* <WeightGraphPanel className="flex-1 mr-4" />
            <ArticlePanel className="w-[400px] h-full overflow-y-auto" /> */
}
