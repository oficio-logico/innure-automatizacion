import type { NextConfig } from 'next';

const isGitHubPagesBuild = process.env.GITHUB_PAGES === 'true';

const nextConfig: NextConfig = isGitHubPagesBuild
  ? {
      output: 'export',
      assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
    }
  : {};

export default nextConfig;
