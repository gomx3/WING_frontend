import { CompanyNewsResponse } from '@/types/analysis'
import { UseQueryResult } from '@tanstack/react-query'

interface Props {
    data: UseQueryResult<CompanyNewsResponse, Error>
}

export const NewsSection = ({ data }: Props) => {
    if (data.data?.length === 0) return null

    return (
        <section className="pb-4">
            <h3 className="text-sm font-semibold text-neutral-600 mb-3">최신 뉴스</h3>
            <div className="space-y-3">
                {data.data?.map((item) => (
                    <a
                        key={item.id}
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="block p-3 bg-neutral-200 rounded-lg hover:bg-neutral-300 transition-colors"
                    >
                        <h4 className="text-sm font-medium text-neutral-700 line-clamp-2">{item.headline}</h4>
                        <div className="mt-2 flex justify-between text-xs text-neutral-600">
                            <span>{item.source}</span>
                            <span>{new Date(item.datetime * 1000).toLocaleDateString()}</span>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    )
}
