import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.xn--canastasnavideaselsalvador-urc.com'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/checkout/success', // Páginas de confirmación no deben ser indexadas
          '/api/', // APIs internas
          '/admin/', // Si tienes admin
          '/_next/', // Archivos de Next.js
          '/private/', // Cualquier carpeta privada
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
