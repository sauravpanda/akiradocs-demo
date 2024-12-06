/** @type {import('next').NextConfig} */
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.json$/,
      type: 'json',
    });
    
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: 100,
          maxAsyncRequests: 100,
          minSize: 5000,
          maxSize: 15000000,
          cacheGroups: {
            defaultVendors: false,
            framework: {
              name: 'framework',
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
              priority: 40,
              chunks: 'all',
            },
            lib: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                if (!module.context) return 'lib';
                
                const match = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
                if (!match) return 'lib';
                
                const packageName = match[1];
                return `lib-${packageName.charAt(0)}`;
              },
              priority: 30,
              minChunks: 1,
              reuseExistingChunk: true,
            }
          }
        }
      };
    }

    return config;
  },
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  compress: true,
};

export default withBundleAnalyzer(nextConfig);
