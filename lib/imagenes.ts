// lib/imagenes.ts
export function buildImageUrl(imagePath: string | undefined): string {
  if (!imagePath) return '/no-image.png'; // ruta local a una imagen por defecto

  // Si la imagen ya es URL completa (http o https), devolver tal cual
  if (imagePath.startsWith('http')) return imagePath;

  // Quita "public/" o "/" al inicio si existe
  const cleanPath = imagePath.replace(/^public[\\/]/, '').replace(/^\/+/, '');

  // Usa la URL base de tu API (sin /api para que apunte a estáticos)
  const base = (process.env.NEXT_PUBLIC_API_URL || 'https://flores-backend-px2c.onrender.com').replace(/\/api$/, '');

  return `${base}/${cleanPath}`;
}