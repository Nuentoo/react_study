/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    // SSRでstyled-componentsが動作
    styledComponents: true,
  },
  experimental: {
    serverComponentsExternalPackages: ['@/_doc', '@/_old'],
  },
};

export default nextConfig;
