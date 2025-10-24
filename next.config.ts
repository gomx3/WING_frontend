import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'vanilla-crop-0ed.notion.site' },
            { protocol: 'https', hostname: 'image.ajunews.com' },
            { protocol: 'https', hostname: 'pimg.mk.co.kr' },
            { protocol: 'https', hostname: 'biz.chosun.com' },
            { protocol: 'https', hostname: 'www.news1.kr' },
            { protocol: 'https', hostname: 'menu.moneys.co.kr' },
        ],
    },
}

export default nextConfig
