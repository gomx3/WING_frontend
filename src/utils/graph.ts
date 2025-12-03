import { LINK_COLORS } from '@/constants/graph'
import { MyLink } from '@/types/graph'

/**
 * 링크(엣지)의 색상을 결정하는 헬퍼 함수
 * @param link - MyLink 데이터
 * @param isInvestment - 현재 투자 모드 여부
 */
export const getLinkColor = (link: MyLink, isInvestment: boolean): string => {
    const label = link.sentimentLabel ?? 'neutral'

    // 1. 투자 모드일 때
    if (isInvestment) {
        switch (label) {
            case 'positive':
                return LINK_COLORS.INVESTMENT_POSITIVE // 긍정
            case 'negative':
                return LINK_COLORS.INVESTMENT_NEGATIVE // 부정
            case 'neutral':
            default:
                return LINK_COLORS.NEUTRAL // 중립
        }
    }

    // 2. 일반 모드일 때 (기사 수는 0이 아님)
    if (label === 'neutral') {
        return LINK_COLORS.NEUTRAL // 중립
    }

    // 3. 일반 모드 + positive/negative
    return LINK_COLORS.DEFAULT
}
