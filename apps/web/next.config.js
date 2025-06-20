
//  this pluggin fix my error like vercel binary error this error rhel-openssl-3.0.x 
import pkg  from '@prisma/nextjs-monorepo-workaround-plugin';
const { withPrisma } = pkg;
/** @type {import('next').NextConfig} */
const config = {
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  webpack(config, { isServer }) {
    config.watchOptions = {
      ignored: [
        '**/node_modules/**',
        '**/.next/**',
      ],
    };
    return config;
  },
};

export default (config);
