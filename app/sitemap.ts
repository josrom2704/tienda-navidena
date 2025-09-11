import { MetadataRoute } from 'next'
import { getBackendUrl, BACKEND_CONFIG } from '@/lib/backend-config'

// Función para convertir categoría a slug
function categoriaToSlug(categoria: string): string {
  return categoria.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

// Función para obtener categorías del backend
async function getCategorias(): Promise<string[]> {
  try {
    const floristeriaId = '68a125df2097950ec3ff19fa';
    const url = `${getBackendUrl(BACKEND_CONFIG.ENDPOINTS.CATEGORIAS)}?floristeriaId=${floristeriaId}`;
    
    const response = await fetch(url, {
      next: { revalidate: 3600 } // Revalidar cada hora
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching categories for sitemap:', error);
    // Fallback a categorías por defecto
    return [
      'flores',
      'canastas con vino',
      'canastas con whisky', 
      'canastas sin licor',
      'regalos navideños',
      'detalles pequeños',
      'canastas frutales'
    ];
  }
}

// Función para obtener productos del backend
async function getProductos(): Promise<any[]> {
  try {
    const floristeriaId = '68a125df2097950ec3ff19fa';
    const url = `${getBackendUrl(BACKEND_CONFIG.ENDPOINTS.PRODUCTOS)}?floristeriaId=${floristeriaId}`;
    
    const response = await fetch(url, {
      next: { revalidate: 3600 } // Revalidar cada hora
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching products for sitemap:', error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.xn--canastasnavideaselsalvador-urc.com'
  
  // Obtener datos dinámicos
  const [categorias, productos] = await Promise.all([
    getCategorias(),
    getProductos()
  ]);

  // Páginas estáticas principales
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/catalogo`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/categorias`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/quienes-somos`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/carrito`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/checkout`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];

  // Páginas de categorías dinámicas
  const categoriaPages: MetadataRoute.Sitemap = categorias.map(categoria => ({
    url: `${baseUrl}/catalogo/${categoriaToSlug(categoria)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Páginas de productos individuales (si necesitas incluir productos específicos)
  const productoPages: MetadataRoute.Sitemap = productos.slice(0, 100).map(producto => ({
    url: `${baseUrl}/producto/${producto._id}`,
    lastModified: new Date(producto.updatedAt || producto.createdAt),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...categoriaPages,
    ...productoPages,
  ]
}
