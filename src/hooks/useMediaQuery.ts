'use client'

import { useEffect, useState } from 'react'

/**
 * 지정한 CSS media query의 매치 여부를 반환하는 커스텀 훅
 *
 * @example
 * const isDesktop = useMediaQuery('(min-width: 1440px)')
 *
 * @param query - CSS media query string (ex: "(min-width: 1024px)")
 * @returns boolean - media query를 만족하면 true, 아니면 false
 */
export function useMediaQuery(query: string) {
    const [matches, setMatches] = useState(false)

    useEffect(() => {
        const media = window.matchMedia(query)
        const listener = () => setMatches(media.matches)

        setMatches(media.matches)
        media.addEventListener('change', listener)

        return () => media.removeEventListener('change', listener)
    }, [query])

    return matches
}
