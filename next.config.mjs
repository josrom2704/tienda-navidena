/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // ✅ OPTIMIZACIÓN: Configuración de imágenes optimizada
  images: {
    domains: ['res.cloudinary.com', 'flores-backend-px2c.onrender.com'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 días
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // ✅ OPTIMIZACIÓN: Compresión y optimizaciones
  compress: true,
  poweredByHeader: false,
  // ✅ OPTIMIZACIÓN: Bundle splitting avanzado
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // ✅ Vendor chunk para librerías grandes
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /node_modules/,
            priority: 20
          },
          // ✅ Chunk para UI components
          ui: {
            name: 'ui',
            chunks: 'all',
            test: /[\\/]components[\\/]ui[\\/]/,
            priority: 30
          },
          // ✅ Chunk para Lucide icons
          icons: {
            name: 'icons',
            chunks: 'all',
            test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
            priority: 25
          }
        }
      };
    }
    return config;
  },
  // ✅ OPTIMIZACIÓN: Configuración de headers para cache
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=300, s-maxage=300', // 5 minutos
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // 1 año
          },
        ],
      },
    ];
  },
}

export default nextConfig
