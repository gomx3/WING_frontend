import { ArticleItem } from './ArticleItem'

export const ArticlePanel = () => {
    return (
        <div className="w-full max-w-md p-3 space-y-8 border-l border-white-600">
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
                <ArticleItem />
                <ArticleItem />
                <ArticleItem />
                <ArticleItem />
                <ArticleItem />
            </div>
        </div>
    )
}
