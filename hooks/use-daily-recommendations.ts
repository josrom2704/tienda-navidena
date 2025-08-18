import { useState, useEffect, useCallback } from 'react';
import { useApi } from './useApi';
import { useDominio } from './useDominio';
import { 
  RECOMMENDATION_CONFIG, 
  mapDatabaseProduct
} from '@/lib/recommendation-config';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  featured?: boolean;
}

interface UseDailyRecommendationsReturn {
  dailyProducts: Product[];
  isLoading: boolean;
  error: string | null;
  refreshRecommendations: () => Promise<void>;
  lastUpdated: Date | null;
}

export function useDailyRecommendations(): UseDailyRecommendationsReturn {
  const [dailyProducts, setDailyProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  
  const { getCategoriasByDominio, getProductosByCategoria, getProductosAll } = useApi();
  const dominio = useDominio();

  // Función para seleccionar productos aleatorios pero consistentes por día
  const selectDailyProducts = useCallback(async (): Promise<void> => {
    if (!dominio) {
      console.log("⏳ Esperando dominio...");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      console.log("🔍 Obteniendo productos recomendados para dominio:", dominio);

      // Obtener categorías disponibles
      let categorias = await getCategoriasByDominio(dominio);
      console.log("✅ Categorías obtenidas:", categorias);
      
      // Si no hay categorías, no mostrar productos
      if (!categorias || categorias.length === 0) {
        console.log("⚠️ No hay categorías disponibles");
        setDailyProducts([]);
        setLastUpdated(new Date());
        return;
      }

      // Seleccionar 4 categorías aleatorias diferentes
      const selectedCategories: string[] = [];
      const shuffledCategories = [...categorias].sort(() => Math.random() - 0.5);
      
      for (let i = 0; i < Math.min(RECOMMENDATION_CONFIG.maxProductsPerDay, shuffledCategories.length); i++) {
        selectedCategories.push(shuffledCategories[i]);
      }

      // Obtener productos de las categorías seleccionadas
      let allProducts: Product[] = [];
      
      for (const categoria of selectedCategories) {
        try {
          console.log(`🔍 Obteniendo productos de categoría: ${categoria}`);
          const productos = await getProductosByCategoria(dominio, categoria);
          
          if (productos && productos.length > 0) {
            // Seleccionar 1 producto aleatorio de cada categoría
            const randomIndex = Math.floor(Math.random() * productos.length);
            const selectedProduct = productos[randomIndex];
            
            console.log(`✅ Producto seleccionado de ${categoria}:`, selectedProduct);
            
            // Convertir el formato de la base de datos al formato del componente
            const formattedProduct: Product = mapDatabaseProduct(selectedProduct, categoria);
            
            allProducts.push(formattedProduct);
          }
        } catch (error) {
          console.warn(`❌ Error obteniendo productos de categoría ${categoria}:`, error);
          // Continuar con la siguiente categoría
        }
      }
      
      // Si no obtuvimos productos por categoría, intentar obtener todos los productos
      if (allProducts.length === 0) {
        console.log("🔍 Intentando obtener todos los productos disponibles...");
        
        try {
          const todosLosProductos = await getProductosAll(dominio);
          
          if (todosLosProductos && todosLosProductos.length > 0) {
            console.log(`✅ Encontrados ${todosLosProductos.length} productos en total`);
            // Seleccionar 4 productos aleatorios
            const shuffledProducts = [...todosLosProductos].sort(() => Math.random() - 0.5);
            const selectedProducts = shuffledProducts.slice(0, RECOMMENDATION_CONFIG.maxProductsPerDay);
            
            // Convertir cada producto al formato del componente
            allProducts = selectedProducts.map(producto => mapDatabaseProduct(producto, producto.categoria || "General"));
          }
        } catch (error) {
          console.warn("❌ Error obteniendo todos los productos:", error);
        }
      }

      // ✅ NO usar productos hardcodeados - solo productos del backend
      if (allProducts.length === 0) {
        console.log("⚠️ No hay productos disponibles en el backend");
        setDailyProducts([]);
        setError("No hay productos disponibles en este momento");
      } else {
        // Limitar a exactamente 4 productos
        const finalProducts = allProducts.slice(0, RECOMMENDATION_CONFIG.maxProductsPerDay);
        console.log("✅ Productos recomendados finales:", finalProducts);
        setDailyProducts(finalProducts);
        setError(null);
      }
      
      setLastUpdated(new Date());

    } catch (error) {
      console.error("❌ Error en selección diaria:", error);
      setError("No se pudieron cargar los productos recomendados");
      
      // ✅ NO usar productos hardcodeados - array vacío en caso de error
      setDailyProducts([]);
      setLastUpdated(new Date());
    } finally {
      setIsLoading(false);
    }
  }, [getCategoriasByDominio, getProductosByCategoria, getProductosAll, dominio]);

  // Función para refrescar recomendaciones
  const refreshRecommendations = useCallback(async (): Promise<void> => {
    await selectDailyProducts();
  }, [selectDailyProducts]);

  // Cargar productos al montar el componente
  useEffect(() => {
    selectDailyProducts();
  }, [selectDailyProducts]);

  return {
    dailyProducts,
    isLoading,
    error,
    refreshRecommendations,
    lastUpdated,
  };
}
