import React from 'react'
import SVGList from '@/assets/list-check.svg'

export const ArticlePanelPlaceholder = () => {
    return (
        <div className="w-[32rem] h-full flex flex-col items-center justify-center p-3 gap-3 border-l border-neutral-200">
            <SVGList className="w-20 h-20" />
            <h3 className="mt-2 text-[1.25rem] font-semibold text-neutral-500 whitespace-pre-line text-center leading-[130%] tracking-[-0.45px]">
                관계선을 선택해{'\n'} 뉴스 목록을 확인하세요.
            </h3>
            <p className="mt-1 text-[0.875rem] leading-[130%] text-neutral-500 tracking-[-0.45px]">
                키워드의 관계를 보여주는 기사들을 확인할 수 있어요.
            </p>
        </div>
    )
}
