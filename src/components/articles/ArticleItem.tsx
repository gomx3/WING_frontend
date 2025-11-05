import { formatRelativeTime, truncateMiddle } from '@/utils/format'
import Link from 'next/link'
import Image from 'next/image'
import { ApiNews } from '@/types/graph'

interface ArticleItemProps {
    article: ApiNews
}

export const ArticleItem = ({ article }: ArticleItemProps) => {
    return (
        <Link
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-row items-start gap-4"
        >
            <div className="flex flex-col gap-1 flex-1">
                <h3 className="text-neutral-600 text-[1rem] font-semibold tracking-[-0.4px]">
                    {truncateMiddle(article.title, 22, 10)}
                </h3>
                <p className="text-[0.9rem] text-neutral-500 tracking-[-0.4px]">
                    {formatRelativeTime(article.pubDate)}・{'개미뉴스'}
                </p>
            </div>

            <div className="w-20 h-20 rounded-[8px] overflow-hidden relative flex-shrink-0">
                <Image
                    src={
                        'https://vanilla-crop-0ed.notion.site/image/attachment%3A798a19bd-473b-4cab-bb62-ac7b85e8ee6e%3Aimage.png?table=block&id=27e89bed-ac8c-8069-8b98-c72307815d58&spaceId=82089bed-ac8c-8158-af3b-0003d8133478&width=1420&userId=&cache=v2'
                    }
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-115"
                />
            </div>
        </Link>
    )
}
