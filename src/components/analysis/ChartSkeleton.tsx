/**
 * 차트 데이터 로딩 중에 표시되는 스켈레톤 UI 컴포넌트
 *
 * @component
 * @description 회색 배경의 pulse 애니메이션을 통해 로딩 상태임을 시각적으로 전달합니다.
 * 부모 컨테이너의 크기에 맞춰 100% 너비와 높이를 가집니다.
 */
export const ChartSkeleton = ({ sizeConfig = 'h-32' }: { sizeConfig?: string }) => {
    return <div className={`w-full bg-neutral-200/50 animate-pulse rounded-lg mb-2 ${sizeConfig}`} />
}
