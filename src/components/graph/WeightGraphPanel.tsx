import { KeywordSearch } from '../search'
import { WeightGraphView } from './WeightGraphView'

export const WeightGraphPanel = () => {
    return (
        <div className="relative w-full h-full flex flex-col">
            <KeywordSearch />
            <div className="flex-1 relative overflow-hidden">
                <WeightGraphView />
            </div>
        </div>
    )
}
