'use client'

import { useGraphStore } from '@/stores/graphStore'
import { ArticleItem } from './ArticleItem'
import Image from 'next/image'

const ARTICLE = {
    title: 'AI 주식 추천, 9월에도 강세 지속, S&P 500 대비 109% 초과 수익',
    summary:
        '9월 글로벌 증시는 과열 우려에도 상승세를 이어갔으며, 올바른 종목 투자자는 수익을 실현했습니다. 특히 InvestingPro 구독자는 월 10달러 이하로 AI가 선정한 종목 리스트를 받아 한 달 만에 마벨(+31.06%), 오라클(+25.04%), Onto Innovation(+23.02%), Groupe Dynamite(+69.67%), L&C Bio(+83.67%) 등 높은 수익률을 기록했습니다. 미국 회원은 20% 이상 상승한 8개 종목 추천을 받았고, 기술 중심 추천은 93% 적중률을 달성했습니다. 전체 추천 목록은 출시 이후 148.25% 수익으로 S&P 500 대비 109.46% 초과 성과를 냈습니다.',
    origin: 'Investing.com',
    updatedAt: '2025-09-30',
    link: 'https://kr.investing.com/news/stock-market-news/article-1651369',
}

const ArticlePanelPlaceholder = () => {
    return (
        <div className="w-full desktop:max-w-[28rem] h-full flex flex-col items-center justify-center p-3 gap-3 border-t desktop:border-t-0 desktop:border-l border-white-600">
            <Image src="/assets/news.svg" alt="" width={180} height={196} />

            <h3 className="mt-2 text-[1.25rem] font-semibold text-gray-100 whitespace-pre-line text-center leading-[130%] tracking-[-0.45px]">
                관계선을 선택해{'\n'} 뉴스 목록을 확인하세요.
            </h3>
            <p className="mt-1 text-[0.8rem]] leading-[130%] text-gray-400 tracking-[-0.45px]">
                두 키워드 간 관계를 보여주는 기사들을 확인할 수 있어요.
            </p>
        </div>
    )
}

export const ArticlePanel = () => {
    const { graphData } = useGraphStore()
    const hasGraphData = graphData && graphData.links.length > 0

    if (!hasGraphData) {
        return <ArticlePanelPlaceholder />
    }

    return (
        <div className="w-full desktop:max-w-[28rem] h-full max-h-[16rem] tablet:max-h-[20rem] desktop:max-h-full p-3 space-y-8 border-t desktop:border-t-0 desktop:border-l border-white-600 overflow-y-auto">
            <div>
                <p className="px-2 py-1 rounded-[4px] w-fit text-[0.8rem] tracking-[-0.4px] text-primary-600 border border-white-500">
                    최근 3개월
                </p>
                <h3 className="font-bold text-[1.4rem]">{`노드 A <-> 노드 B 관련 기사`}</h3>
                <p className="text-[0.9rem] tracking-[-0.45px] text-gray-300">
                    최근 3개월 동안 35개의 기사에서 함께 언급되었습니다.
                </p>
            </div>

            <hr className="border-gray-800" />

            <div className="space-y-6">
                <ArticleItem article={ARTICLE} />
                <ArticleItem article={ARTICLE} />
                <ArticleItem article={ARTICLE} />
                <ArticleItem article={ARTICLE} />
                <ArticleItem article={ARTICLE} />
                <ArticleItem article={ARTICLE} />
                <ArticleItem article={ARTICLE} />
                <ArticleItem article={ARTICLE} />
            </div>
        </div>
    )
}
