/**
 * 애니메이션이 적용된 기본 스켈레톤 박스 컴포넌트
 *
 * @param {object} props - 컴포넌트 props
 * @param {string} props.sizeConfig - TailwindCSS 클래스 문자열로, 박스의 너비와 높이 등의 크기를 지정
 *
 * @returns {JSX.Element} 크기와 애니메이션이 적용된 스켈레톤 박스
 */
export const BaseSkeleton = ({ sizeConfig }: { sizeConfig: string }) => {
    return (
        <div
            className={`
                ${sizeConfig} rounded-lg bg-[length:200%_100%]
                bg-gradient-to-r from-neutral-black-opacity5 via-neutral-black-opacity10 to-neutral-black-opacity5 motion-safe:animate-[var(--animate-wave)]
            `}
        />
    )
}
