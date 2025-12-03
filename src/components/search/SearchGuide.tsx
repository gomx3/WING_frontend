export const SearchGuide = () => {
    return (
        <div className="text-sm text-neutral-500 px-2 leading-relaxed">
            <p>
                첫 번째 입력한 키워드가 <strong className="text-primary-600">메인 키워드</strong>로 설정되고,
            </p>
            <p>
                이후 추가한 키워드들은 자동으로 <strong className="text-primary-600">서브 키워드</strong>로 분류됩니다.
            </p>
            <p className="mt-3">
                모든 키워드를 입력한 뒤 <strong className="underline">분석하기</strong> 버튼을 누르면 그래프 생성이
                시작됩니다.
            </p>
        </div>
    )
}
