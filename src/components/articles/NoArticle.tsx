import Image from 'next/image'

export const NoArticle = () => {
    return (
        <div className="flex flex-col items-center justify-center mt-60 gap-3">
            <Image src="/assets/empty-box.svg" alt="빈 박스 아이콘" width={60} height={60} />
            <h3 className="mt-2 text-[1.25rem] font-semibold text-neutral-500 whitespace-pre-line text-center leading-[130%] tracking-[-0.45px]">
                관련 기사가 없습니다.
            </h3>
            <p className="mt-1 text-[0.875rem] leading-[130%] text-neutral-500 tracking-[-0.45px]">
                선택한 키워드와 관련된 최근 기사를 찾지 못했습니다.
            </p>
        </div>
    )
}
