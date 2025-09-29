import { ArticlePanel } from './components/articles'
import { WeightGraphPanel } from './components/graph'

export default function Home() {
    return (
        <div className="flex flex-row justify-between h-full pb-3">
            <WeightGraphPanel />
            <ArticlePanel />
        </div>
    )
}
