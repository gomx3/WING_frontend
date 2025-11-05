import { ChevronDown, UserRound } from 'lucide-react'

/**
 * 사용자의 로그인 상태를 확인하는 동안 표시되는 스켈레톤 UI입니다.
 *
 * 새로고침 시 '로그아웃 상태 -> 로그인 상태'로 UI가 깜빡이는 현상(flicker)을 방지하고
 * 사용자에게 로딩 중임을 시각적으로 알리는 역할을 합니다.
 *
 * @returns {JSX.Element} Auth 스켈레톤 컴포넌트
 */
export const AuthSkeleton = () => {
    return (
        <div className="flex flex-row justify-center items-center gap-1">
            <div className="flex justify-center items-center w-9 aspect-square rounded-full border border-neutral-300 bg-neutral-200">
                <UserRound className="text-neutral-400" />
            </div>
            <ChevronDown className="size-4 text-neutral-400" />
        </div>
    )
}
