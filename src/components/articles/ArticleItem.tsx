import { Article } from '@/types/articles'
import Image from 'next/image'
import Link from 'next/link'

const IMAGE_SRC =
    'https://vanilla-crop-0ed.notion.site/image/attachment%3A798a19bd-473b-4cab-bb62-ac7b85e8ee6e%3Aimage.png?table=block&id=27e89bed-ac8c-8069-8b98-c72307815d58&spaceId=82089bed-ac8c-8158-af3b-0003d8133478&width=1420&userId=&cache=v2'

interface ArticleItemProps {
    article: Article
}

export const ArticleItem = ({ article }: ArticleItemProps) => {
    return (
        <Link href={article.link} target="_blank" rel="noopener noreferrer" className="flex flex-row items-start gap-4">
            <div className="flex flex-col w-full">
                <div className="text-[1rem] font-bold leading-[130%]">{article.title}</div>
                <p className="text-[0.9rem] leading-[120%] line-clamp-3 overflow-hidden text-neutral-500">
                    {article.summary}
                </p>
                <p className="text-[0.9rem] text-neutral-500">
                    {article.origin} | {article.updatedAt}
                </p>
            </div>
            <Image src={IMAGE_SRC} alt={article.title} width={120} height={60} className="rounded-[8px]" />
        </Link>
    )
}
