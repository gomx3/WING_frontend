/**
 * 과거 날짜를 기준으로 상대적인 시간 문자열로 포맷합니다.
 * 예: 5분 전, 2시간 전, 3일 전 등
 *
 * @param date - 과거 시점의 날짜 (문자열, 숫자, 또는 Date 객체)
 * @param isKST - true면 KST 기준 입력, false면 UTC 기준 입력
 * @returns 상대 시간 문자열 (예: '3일 전', '방금 전')
 */
export function formatRelativeTime(date: string | number | Date, isKST: boolean = false): string {
    const now = new Date()
    let past = new Date(date)

    if (!isKST) past = new Date(past.getTime() + 9 * 60 * 60 * 1000)

    const diff = now.getTime() - past.getTime()

    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const months = Math.floor(days / 30)
    const years = Math.floor(days / 365)

    if (years > 0) return `${years}년 전`
    if (months > 0) return `${months}개월 전`
    if (days > 0) return `${days}일 전`
    if (hours > 0) return `${hours}시간 전`
    if (minutes > 0) return `${minutes}분 전`
    return '방금 전'
}
