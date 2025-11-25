import { useAuthStore } from '@/stores/authStore'
import { useGraphStore } from '@/stores/graphStore'
import clsx from 'clsx'

interface InvestModeControllerProps {
    showMenu: boolean
}

export const InvestModeController = ({ showMenu }: InvestModeControllerProps) => {
    const accessToken = useAuthStore((state) => state.accessToken)
    const { isInvestmentMode, toggleInvestmentMode } = useGraphStore()

    return (
        <div className={clsx('mt-6 space-y-2', showMenu ? 'block' : 'hidden')}>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-neutral-200">
                <label
                    htmlFor="investment-toggle"
                    className="font-medium text-neutral-700 tracking-[-0.4px] cursor-pointer"
                >
                    종목 투자 모드
                </label>
                <button
                    id="investment-toggle"
                    role="switch"
                    aria-checked={isInvestmentMode}
                    onClick={accessToken ? toggleInvestmentMode : undefined}
                    disabled={!accessToken}
                    className={clsx(
                        'relative inline-flex h-6 w-11 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2',
                        isInvestmentMode ? 'bg-primary-600' : 'bg-neutral-300',
                        accessToken ? 'cursor-pointer' : 'cursor-default'
                    )}
                >
                    <span
                        aria-hidden="true"
                        className={clsx(
                            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                            isInvestmentMode ? 'translate-x-5' : 'translate-x-0'
                        )}
                    />
                </button>
            </div>
            <p className="text-center text-xs text-neutral-500 px-1">
                {isInvestmentMode
                    ? '활성화됨: 링크 색상으로 감성을 표시합니다.'
                    : '비활성화됨: 모든 링크가 중립 색상입니다.'}
            </p>
        </div>
    )
}
