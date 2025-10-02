import Image from 'next/image'
import Link from 'next/link'

const IMAGE_SRC =
    'https://vanilla-crop-0ed.notion.site/image/attachment%3A798a19bd-473b-4cab-bb62-ac7b85e8ee6e%3Aimage.png?table=block&id=27e89bed-ac8c-8069-8b98-c72307815d58&spaceId=82089bed-ac8c-8158-af3b-0003d8133478&width=1420&userId=&cache=v2'
const ARTICLE = {
    title: 'AI 주식 추천, 9월에도 강세 지속, S&P 500 대비 109% 초과 수익',
    summary:
        '9월 글로벌 증시는 과열 우려에도 상승세를 이어갔으며, 올바른 종목 투자자는 수익을 실현했습니다. 특히 InvestingPro 구독자는 월 10달러 이하로 AI가 선정한 종목 리스트를 받아 한 달 만에 마벨(+31.06%), 오라클(+25.04%), Onto Innovation(+23.02%), Groupe Dynamite(+69.67%), L&C Bio(+83.67%) 등 높은 수익률을 기록했습니다. 미국 회원은 20% 이상 상승한 8개 종목 추천을 받았고, 기술 중심 추천은 93% 적중률을 달성했습니다. 전체 추천 목록은 출시 이후 148.25% 수익으로 S&P 500 대비 109.46% 초과 성과를 냈습니다.',
    origin: 'Investing.com',
    updatedAt: '2025-09-30',
    link: 'https://kr.investing.com/news/stock-market-news/article-1651369',
}

export const ArticleItem = () => {
    return (
        <Link href={ARTICLE.link} target="_blank" rel="noopener noreferrer" className="flex flex-row items-start gap-4">
            <div className="flex flex-col w-full">
                <div className="text-[1rem] font-bold leading-[130%]">{ARTICLE.title}</div>
                <p className="text-[0.9rem] leading-[120%] line-clamp-3 overflow-hidden text-gray-500">
                    {ARTICLE.summary}
                </p>
                <p className="text-[0.9rem] text-gray-500">
                    {ARTICLE.origin} | {ARTICLE.updatedAt}
                </p>
            </div>
            <Image src={IMAGE_SRC} alt="임시 기사 썸네일" width={120} height={60} className="rounded-[8px]" />
        </Link>
    )
}
