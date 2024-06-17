// next.config.js
const { createProxyMiddleware } = require('http-proxy-middleware');

const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  runtimeCaching,
  buildExcludes: [/middleware-manifest.json$/],
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = withPWA({
  reactStrictMode: false,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'socios.excellencebusinessclub.com',
        port: '',
        pathname: '/archivos/socio_fotos/**',
      }, 
      {
        protocol: 'http',
        hostname: '01-servidor',
        port: '',
        pathname: '/react_back/archivos/socio_fotos/**',
      },
    ],
  },
  i18n: {
    locales: ["fr"],
    defaultLocale: "fr",
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://01-servidor/react_back/action.php/:path*', // Reemplaza con la URL de tu servidor backend
      },
      {
        source: '/api_table/:path*',
        destination: 'http://01-servidor/react_back/getTable.php/:path*', // Reemplaza con la URL de tu servidor backend
      }
    ];
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true,
      },
    ];
  },
});

module.exports = nextConfig;