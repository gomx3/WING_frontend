import Image from 'next/image'
import { UserRound } from 'lucide-react'

export const HeaderDesktop = () => {
    return (
        <div className="flex flex-row justify-between px-4 py-2 border-b border-white-600">
            <Image src="/assets/wing.svg" alt="WING 로고" priority width={106} height={36} />
            <button className="flex justify-center items-center w-9 aspect-square rounded-full border-1 border-primary-400 bg-white-700">
                <UserRound className="text-white-50" />
            </button>
        </div>
    )
}
