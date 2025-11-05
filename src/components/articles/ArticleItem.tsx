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
                <h3 className="text-neutral-600 text-[1rem] font-semibold tracking-[-0.4px] line-clamp-2">
                    {article.title}
                </h3>
                <p className="text-[0.9rem] text-neutral-500 tracking-[-0.4px]">
                    {formatRelativeTime(article.pubDate)}・{'개미뉴스'}
                </p>
            </div>

            <div className="w-20 h-20 rounded-[8px] overflow-hidden relative flex-shrink-0">
                <Image
                    src="/assets/no-image.png"
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-115"
                />
            </div>
        </Link>
    )
}
