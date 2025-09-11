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
  },
  // ✅ OPTIMIZACIÓN: Compresión y optimizaciones
  compress: true,
  poweredByHeader: false,
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
  // ✅ OPTIMIZACIÓN: Configuración experimental
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react'],
  },
}

export default nextConfig
