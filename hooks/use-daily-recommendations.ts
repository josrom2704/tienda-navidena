import { useState, useEffect, useCallback } from 'react';
import { useApi } from './useApi';
import { 
  RECOMMENDATION_CONFIG, 
  mapDatabaseProduct, 
  getRandomNumber 
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

  // Función para seleccionar productos aleatorios pero consistentes por día
  const selectDailyProducts = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      // Obtener categorías disponibles
      let categorias = await getCategoriasByDominio("tiendanavidena");
      
      // Si no hay categorías en la API, usar categorías por defecto
      if (!categorias || categorias.length === 0) {
        console.log("No hay categorías en la API, usando categorías por defecto");
        const defaultCategories = ["canastas-vino", "canastas-whisky", "canastas-sin-licor", "flores"];
        categorias = defaultCategories;
      }

      // Seleccionar 4 categorías aleatorias diferentes
      const selectedCategories: string[] = [];
      const shuffledCategories = [...categorias].sort(() => Math.random() - 0.5);
      
      for (let i = 0; i < Math.min(RECOMMENDATION_CONFIG.maxProductsPerDay, shuffledCategories.length); i++) {
        selectedCategories.push(shuffledCategories[i]);
      }

      // Obtener todos los productos disponibles
      let allProducts: Product[] = [];
      
      try {
        // Intentar obtener productos por categoría primero
        for (const categoria of selectedCategories) {
          try {
            const productos = await getProductosByCategoria("tiendanavidena", categoria);
            
            if (productos && productos.length > 0) {
              // Seleccionar 1 producto aleatorio de cada categoría
              const randomIndex = Math.floor(Math.random() * productos.length);
              const selectedProduct = productos[randomIndex];
              
              // Convertir el formato de la base de datos al formato del componente
              const formattedProduct: Product = mapDatabaseProduct(selectedProduct, categoria);
              
              allProducts.push(formattedProduct);
            }
          } catch (error) {
            console.warn(`Error obteniendo productos de categoría ${categoria}:`, error);
            // Continuar con la siguiente categoría
          }
        }
        
        // Si no obtuvimos productos por categoría, intentar obtener todos los productos
        if (allProducts.length === 0) {
          console.log("Intentando obtener todos los productos disponibles...");
          
          try {
            // Intentar obtener productos sin filtrar por dominio
            const todosLosProductos = await getProductosAll("");
            
            if (todosLosProductos && todosLosProductos.length > 0) {
              console.log(`Encontrados ${todosLosProductos.length} productos en total`);
              // Seleccionar 4 productos aleatorios
              const shuffledProducts = [...todosLosProductos].sort(() => Math.random() - 0.5);
              const selectedProducts = shuffledProducts.slice(0, RECOMMENDATION_CONFIG.maxProductsPerDay);
              
              // Convertir cada producto al formato del componente
              allProducts = selectedProducts.map(producto => mapDatabaseProduct(producto, producto.categoria || "General"));
            }
          } catch (error) {
            console.warn("Error obteniendo todos los productos:", error);
          }
        }
      } catch (error) {
        console.error("Error obteniendo productos:", error);
      }

      // Si no hay productos en la API, usar productos de respaldo directamente
      if (allProducts.length === 0) {
        console.log("No hay productos en la API, usando productos de respaldo");
        const backupProducts = getBackupProducts();
        // Seleccionar 4 productos aleatorios de respaldo
        const shuffledBackup = [...backupProducts].sort(() => Math.random() - 0.5);
        allProducts.push(...shuffledBackup.slice(0, RECOMMENDATION_CONFIG.maxProductsPerDay));
      }
      // Si tenemos algunos productos pero no suficientes, completar con productos de respaldo
      else if (allProducts.length < RECOMMENDATION_CONFIG.maxProductsPerDay) {
        const backupProducts = getBackupProducts();
        const needed = RECOMMENDATION_CONFIG.maxProductsPerDay - allProducts.length;
        
        for (let i = 0; i < needed; i++) {
          const randomIndex = Math.floor(Math.random() * backupProducts.length);
          allProducts.push(backupProducts[randomIndex]);
        }
      }

      // Limitar a exactamente 4 productos
      setDailyProducts(allProducts.slice(0, RECOMMENDATION_CONFIG.maxProductsPerDay));
      setLastUpdated(new Date());

    } catch (error) {
      console.error("Error en selección diaria:", error);
      setError("No se pudieron cargar los productos recomendados");
      
      // Usar productos de respaldo en caso de error
      setDailyProducts(getBackupProducts());
      setLastUpdated(new Date());
    } finally {
      setIsLoading(false);
    }
  }, [getCategoriasByDominio, getProductosByCategoria]);

  // Productos de respaldo en caso de error
  const getBackupProducts = useCallback((): Product[] => {
    return RECOMMENDATION_CONFIG.fallbackProducts;
  }, []);

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
