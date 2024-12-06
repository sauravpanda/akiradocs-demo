/** @type {import('next').NextConfig} */
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.json$/,
      type: 'json',
    });
    
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
          commons: {
            name: 'commons',
            minChunks: 2,
            priority: 20,
          },
          lib: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              if (!module.context) return 'lib';
              
              const match = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
              if (!match) return 'lib';
              
              const packageName = match[1];
              
              if (packageName.includes('lodash')) return 'lodash';
              if (packageName.includes('moment')) return 'moment';
              if (packageName.includes('@babel')) return 'babel';
              if (packageName.includes('core-js')) return 'core-js';
              
              return `lib-${packageName.charAt(0)}`;
            },
            priority: 30,
            minChunks: 1,
            reuseExistingChunk: true,
          },
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true,
          },
          mlcAi: {
            test: /[\\/]node_modules[\\/]@mlc-ai[\\/]/,
            name: 'mlc-ai',
            priority: 50,
            chunks: 'async'
          },
        },
      },
    };

    return config;
  },
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  compress: true,
};

export default withBundleAnalyzer(nextConfig);
