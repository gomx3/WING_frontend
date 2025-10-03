import { KeywordSearch } from '../search'
import { WeightGraphView } from './WeightGraphView'

export const WeightGraphPanel = () => {
    return (
        <div className="relative w-full h-full flex flex-col shadow-[inset_0_2px_4px_rgba(0,0,0,0.10)]">
            <KeywordSearch />
            <div className="flex-1 relative overflow-hidden">
                <WeightGraphView />
            </div>
        </div>
    )
}
