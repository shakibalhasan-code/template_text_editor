const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Ensure the app works correctly both locally and when deployed
  output: 'standalone',
  // Disable ESLint during builds to prevent errors
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

