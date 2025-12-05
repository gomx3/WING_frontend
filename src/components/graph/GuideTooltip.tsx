import { Info } from 'lucide-react'
import { useEffect, useState } from 'react'
import Tooltip from '@/assets/guide-tooltip.svg'
import { useGraphStore } from '@/stores'

export const GuideTooltip = () => {
    const [showTooltip, setShowTooltip] = useState(true)
    const selectedGraphId = useGraphStore((state) => state.selectedGraphId)

    const handleInfoClick = () => setShowTooltip(!showTooltip)

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowTooltip(false)
        }, 7000)

        return () => clearTimeout(timer)
    }, [])

    return (
        <>
            {selectedGraphId && (
                <>
                    <button className="absolute bottom-6 left-7 z-10 cursor-pointer">
                        <div className="relative">
                            <Info onClick={handleInfoClick} className="text-neutral-500 pulse-attention" />
                        </div>
                    </button>

                    {showTooltip && <Tooltip className="absolute bottom-10 left-2 z-10" />}
                </>
            )}
        </>
    )
}
