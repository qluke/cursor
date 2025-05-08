import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cursor.codekv.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default withMDX(config);
