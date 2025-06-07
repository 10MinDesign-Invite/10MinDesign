
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
        // 'C:/Users/sanke/Application Data/**',
      ],
    };
    return config;
  },
};

export default config;
