import { BaseSkeleton } from '../Skeleton'

export const ArticleSkeleton = () => {
    return (
        <div className="w-[36rem] h-full px-8 py-6 border-l border-neutral-200 overflow-y-auto">
            <div className="space-y-2">
                <BaseSkeleton sizeConfig="w-full min-h-[34px]" />
                <BaseSkeleton sizeConfig="w-full min-h-[20px]" />
            </div>

            <hr className="my-8 border-neutral-200" />

            <div className="space-y-4">
                <BaseSkeleton sizeConfig="w-full min-h-[74px]" />
                <BaseSkeleton sizeConfig="w-full min-h-[74px]" />
                <BaseSkeleton sizeConfig="w-full min-h-[74px]" />
                <BaseSkeleton sizeConfig="w-full min-h-[74px]" />
                <BaseSkeleton sizeConfig="w-full min-h-[74px]" />
            </div>
        </div>
    )
}
