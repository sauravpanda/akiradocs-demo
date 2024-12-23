/** @type {import('next').NextConfig} */
// import MillionLint from "@million/lint";

const nextConfig = {
    webpack: (config) => {
      config.module.rules.push({
        test: /\.json$/,
        type: 'json',
      })
      
      // Add this condition to handle browser-only code
      config.resolve.fallback = {
        ...config.resolve.fallback,
        "fs": false,
        "net": false,
        "tls": false,
      };
      
      return config
    },
    // i18n: {
    //   locales: ['en', 'es', 'fr', 'de'],
    //   defaultLocale: 'en',
    //   localeDetection: false
    // },
    basePath: process.env.GITHUB_ACTIONS ? '' : undefined,
    assetPrefix: process.env.GITHUB_ACTIONS ? '' : undefined,
}

export default nextConfig;
// export default MillionLint.next({ rsc: true })(nextConfig);
