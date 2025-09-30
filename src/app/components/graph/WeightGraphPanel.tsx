import { KeywordSearch } from './KeywordSearch'
import { WeightGraphView } from './WeightGraphView'

export const WeightGraphPanel = () => {
    return (
        <div className="w-full">
            <KeywordSearch />
            <div className="text-3xl font-bold">TEST</div>
            <WeightGraphView />
        </div>
    )
}
