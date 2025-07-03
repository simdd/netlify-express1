/** @type {import('next').NextConfig} */
const nextConfig = {
  // 启用 SSR 支持
  target: 'serverless',
  // 或者使用实验性特性（Next.js 12+）
  experimental: {
    runtime: 'nodejs',
    serverComponents: true,
  }
};

module.exports = nextConfig;
