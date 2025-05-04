import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["res.cloudinary.com"], // If you are loading images from an external source
  },
  // Remove i18n configuration as it's not needed with App Router
  // The App Router uses [locale] dynamic segments for internationalization
};

export default nextConfig;
