
/** @type {import('next').NextConfig} */
const config = {
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
