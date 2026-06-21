/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML/CSS/JS export — deploys to GitHub Pages, Netlify, S3, Vercel, any static host.
  output: "export",
  // next/image optimization needs a server; disable it for a fully static bundle.
  images: { unoptimized: true },
  // Emit /skills/index.html instead of /skills.html so paths work on plain static hosts.
  trailingSlash: true,
};

export default nextConfig;
