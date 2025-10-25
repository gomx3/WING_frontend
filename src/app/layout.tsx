import type { Metadata } from 'next'
import localFont from 'next/font/local'
import '../styles/global.css'
import Providers from './providers'
import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar'

const pretendard = localFont({
    src: [
        { path: '../styles/fonts/Pretendard-Bold.woff2', weight: '700', style: 'normal' },
        { path: '../styles/fonts/Pretendard-SemiBold.woff2', weight: '600', style: 'normal' },
        { path: '../styles/fonts/Pretendard-Medium.woff2', weight: '500', style: 'normal' },
        { path: '../styles/fonts/Pretendard-Regular.woff2', weight: '400', style: 'normal' },
    ],
    variable: '--font-pretendard',
})

export const metadata: Metadata = {
    title: 'WING',
    description:
        'WING은 국제 정세와 투자 관련 뉴스를 AI로 분석해 가중치 기반 그래프 형태로 시각화하는 서비스입니다. 키워드 간 관계와 흐름을 한눈에 파악하고, 개인화된 보조 지표를 통해 투자 의사 결정을 더 합리적으로 지원합니다.',
    icons: {
        icon: '/favicon.svg',
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="ko">
            <body className={`${pretendard.variable} antialiased flex flex-col h-screen overflow-y-hidden`}>
                <Providers>
                    <div className="flex flex-row w-full h-full">
                        <Sidebar />
                        <div className="flex flex-col w-full">
                            <Header />
                            <main className="flex-1 overflow-y-hidden">{children}</main>
                        </div>
                    </div>
                </Providers>
            </body>
        </html>
    )
}
