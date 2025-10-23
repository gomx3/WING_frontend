import React from 'react'
import Image from 'next/image'

export const ArticlePanelPlaceholder = () => {
    return (
        <div className="w-[28rem] h-full flex flex-col items-center justify-center p-3 gap-3 border-l border-neutral-200">
            <Image src="/assets/list-check.svg" alt="기사 리스트 아이콘" width={80} height={80} />
            <h3 className="mt-2 text-[1.25rem] font-semibold text-neutral-700 whitespace-pre-line text-center leading-[130%] tracking-[-0.45px]">
                관계선을 선택해{'\n'} 뉴스 목록을 확인하세요.
            </h3>
            <p className="mt-1 text-[0.875rem] leading-[130%] text-neutral-500 tracking-[-0.45px]">
                키워드의 관계를 보여주는 기사들을 확인할 수 있어요.
            </p>
        </div>
    )
}
