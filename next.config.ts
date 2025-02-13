import type { NextConfig } from "next";

// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config();

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  env: {
    JWT_SECRET: process.env.JWT_SECRET,
  },
};
export default nextConfig;
