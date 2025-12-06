import { BaseSkeleton } from '../Skeleton'

export const TopKeywordsSkeleton = () => {
    return (
        <div className="flex flex-col w-[16rem] h-fit p-4 gap-3  rounded-2xl bg-neutral-50 border border-neutral-100 shadow-lg">
            <p className="text-sm font-bold text-neutral-600 tracking-[-0.4px]">인기 키워드</p>
            <div className="space-y-2">
                <BaseSkeleton sizeConfig="w-full h-[30px]" />
                <BaseSkeleton sizeConfig="w-full h-[30px]" />
                <BaseSkeleton sizeConfig="w-full h-[30px]" />
                <BaseSkeleton sizeConfig="w-full h-[30px]" />
                <BaseSkeleton sizeConfig="w-full h-[30px]" />
            </div>
        </div>
    )
}
