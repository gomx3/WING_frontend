import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'vanilla-crop-0ed.notion.site',
            },
        ],
    },
}

export default nextConfig
