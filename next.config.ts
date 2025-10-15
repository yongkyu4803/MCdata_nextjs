import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // Next.js DevTools 비활성화 (개발 서버 안정성 향상)
    reactCompiler: false,
  },
  // 개발 서버 성능 최적화
  devIndicators: {
    buildActivity: true,
    buildActivityPosition: 'bottom-right',
  },
};

export default nextConfig;
