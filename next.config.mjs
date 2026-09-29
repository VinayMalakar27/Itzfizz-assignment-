/**
 * Static export so the site can be hosted on GitHub Pages.
 * NEXT_PUBLIC_BASE_PATH is set by the deploy workflow to "/<repo-name>".
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
