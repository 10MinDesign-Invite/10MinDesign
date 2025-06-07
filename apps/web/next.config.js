
// /** @type {import('next').NextConfig} */
// const config = {
//   images: {
//     domains: ['lh3.googleusercontent.com'],
//   },
//   webpack(config, { isServer }) {
//     config.watchOptions = {
//       ignored: [
//         '**/node_modules/**',
//         '**/.next/**',
//         // 'C:/Users/sanke/Application Data/**',
//       ],
//     };
//     return config;
//   },
// };

// export default config;



// next.config.mjs

import { withPrisma } from '@prisma/nextjs-monorepo-workaround-plugin';

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

export default withPrisma(config);
