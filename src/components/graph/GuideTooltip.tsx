import { Info } from 'lucide-react'
import { useEffect, useState } from 'react'
import Tooltip from '@/assets/guide-tooltip.svg'

export const GuideTooltip = () => {
    const [showTooltip, setShowTooltip] = useState(true)

    const handleInfoClick = () => setShowTooltip(!showTooltip)

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowTooltip(false)
        }, 5000)

        return () => clearTimeout(timer)
    }, [])

    return (
        <>
            <button className="absolute top-5 right-5 z-10 cursor-pointer">
                <div className="relative">
                    <Info onClick={handleInfoClick} className="text-neutral-500 pulse-7s" />
                </div>
            </button>

            {showTooltip && <Tooltip className="absolute -top-[6px] right-10" />}
        </>
    )
}
