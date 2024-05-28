// next.config.js
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["your-image-domain.com"], // If you are loading images from an external source
  },
};

export default nextConfig;
