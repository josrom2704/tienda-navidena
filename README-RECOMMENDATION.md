# Sistema de Recomendación Inteligente - Tienda Navideña

## Descripción General

Se ha implementado un **algoritmo de recomendación inteligente** que reemplaza los productos hardcodeados por un sistema dinámico que:

- ✅ **Se conecta con tu base de datos** en tiempo real
- ✅ **Selecciona 4 productos únicos cada día** de categorías aleatorias
- ✅ **Mantiene consistencia diaria** (mismos productos durante el día)
- ✅ **Cambia automáticamente** cada día a medianoche
- ✅ **Incluye sistema de fallback** para casos de error
- ✅ **Es completamente configurable** y escalable

## Características del Algoritmo

### 🎯 **Selección Inteligente**
- **4 productos por día** de categorías diferentes
- **1 producto por categoría** para máxima diversidad
- **Selección aleatoria pero consistente** durante el día

### 🔄 **Rotación Diaria Automática**
- Los productos cambian **automáticamente cada día**
- **Misma semilla de fecha** = mismos productos durante el día
- **Nueva semilla cada día** = productos completamente diferentes

### 🛡️ **Sistema de Fallback Robusto**
- Productos de respaldo en caso de error de conexión
- Manejo elegante de errores de API
- Continuidad del servicio sin interrupciones

## Arquitectura del Sistema

### 1. **Hook Personalizado** (`hooks/use-daily-recommendations.ts`)
```typescript
const { 
  dailyProducts,        // Productos recomendados del día
  isLoading,           // Estado de carga
  error,               // Errores si los hay
  refreshRecommendations, // Función para recargar
  lastUpdated          // Timestamp de última actualización
} = useDailyRecommendations();
```

### 2. **Configuración Centralizada** (`lib/recommendation-config.ts`)
```typescript
export const RECOMMENDATION_CONFIG = {
  maxProductsPerDay: 4,           // Productos por día
  maxProductsPerCategory: 1,      // Productos por categoría
  defaultDomain: "tiendanavidena", // Dominio por defecto
  enableFallback: true,           // Habilitar fallback
  cacheEnabled: true,             // Habilitar caché
  maxRetries: 3,                  // Reintentos máximos
};
```

### 3. **Componente de UI** (`components/daily-selection.tsx`)
- Renderiza los productos recomendados
- Maneja estados de carga y error
- Incluye botón de refresh para testing
- Muestra timestamp de última actualización

## Flujo de Funcionamiento

### **Paso 1: Generación de Semilla Diaria**
```typescript
// Genera un hash único basado en la fecha actual
const seed = generateDailySeed(); // Ej: 2024-01-15 → 12345
```

### **Paso 2: Selección de Categorías**
```typescript
// Obtiene categorías de la base de datos
const categorias = await getCategoriasByDominio("tiendanavidena");

// Selecciona 4 categorías aleatorias usando la semilla
const selectedCategories = shuffleAndSelect(categorias, seed, 4);
```

### **Paso 3: Obtención de Productos**
```typescript
// Para cada categoría seleccionada
for (const categoria of selectedCategories) {
  // Obtiene productos de la categoría
  const productos = await getProductosByCategoria("tiendanavidena", categoria);
  
  // Selecciona 1 producto aleatorio usando la semilla
  const randomIndex = getRandomNumber(0, productos.length - 1, seed);
  const selectedProduct = productos[randomIndex];
  
  // Mapea el formato de la BD al formato del componente
  const formattedProduct = mapDatabaseProduct(selectedProduct, categoria);
}
```

### **Paso 4: Fallback y Validación**
```typescript
// Si no hay suficientes productos, completa con fallback
if (allProducts.length < 4) {
  const backupProducts = getBackupProducts();
  const needed = 4 - allProducts.length;
  // Completa con productos de respaldo
}
```

## Configuración de la Base de Datos

### **Estructura Esperada**
Tu base de datos debe tener estos endpoints:

```typescript
// 1. Obtener categorías por dominio
GET /api/categorias?dominio=tiendanavidena
Response: ["Flores", "Canastas", "Vinos", "Chocolates", ...]

// 2. Obtener productos por categoría
GET /api/flores?dominio=tiendanavidena&categoria=Flores
Response: [
  {
    id: 1,
    nombre: "Rosa Roja Premium",
    descripcion: "Rosa roja de alta calidad",
    precio: 25.99,
    precio_original: 29.99,
    imagen: "url_imagen.jpg",
    categoria: "Flores"
  },
  // ... más productos
]
```

### **Mapeo de Campos**
El sistema mapea automáticamente estos campos:

| Campo Componente | Campos BD (en orden de prioridad) |
|------------------|-----------------------------------|
| `id`            | `id`                              |
| `name`          | `nombre`, `name`                  |
| `description`   | `descripcion`, `description`      |
| `price`         | `precio`, `price`                 |
| `originalPrice` | `precio_original`, `originalPrice` |
| `image`         | `imagen`, `image`                 |
| `category`      | `categoria`, `category`           |

## Personalización del Algoritmo

### **Cambiar Número de Productos**
```typescript
// En lib/recommendation-config.ts
export const RECOMMENDATION_CONFIG = {
  maxProductsPerDay: 6,        // Cambiar a 6 productos
  maxProductsPerCategory: 2,   // 2 productos por categoría
};
```

### **Cambiar Dominio**
```typescript
// En hooks/use-daily-recommendations.ts
const categorias = await getCategoriasByDominio("tu-nuevo-dominio");
```

### **Agregar Nuevas Categorías**
```typescript
// En tu base de datos, simplemente agrega nuevas categorías
// El algoritmo las detectará automáticamente
```

### **Modificar Productos de Fallback**
```typescript
// En lib/recommendation-config.ts
fallbackProducts: [
  // Agregar, quitar o modificar productos aquí
  {
    id: 5,
    name: "Nuevo Producto",
    description: "Descripción del nuevo producto",
    price: 75,
    category: "Nueva Categoría",
    // ... otros campos
  }
]
```

## Ventajas del Sistema

### 🚀 **Performance**
- **Carga asíncrona** sin bloquear la UI
- **Caché inteligente** para evitar llamadas innecesarias
- **Lazy loading** de productos

### 🔒 **Confiabilidad**
- **Manejo robusto de errores**
- **Sistema de fallback** automático
- **Reintentos automáticos** en caso de fallo

### 🎨 **Flexibilidad**
- **Fácil personalización** del algoritmo
- **Configuración centralizada**
- **Escalable** para futuras funcionalidades

### 📱 **UX Mejorada**
- **Estados de carga** elegantes
- **Manejo de errores** user-friendly
- **Información de actualización** en tiempo real

## Casos de Uso

### **Desarrollo/Testing**
```typescript
// Botón de refresh para testing
<button onClick={refreshRecommendations}>
  🔄 Recargar Recomendaciones
</button>
```

### **Producción**
- Los productos cambian automáticamente cada día
- No requiere intervención manual
- Mantiene la frescura del contenido

### **Mantenimiento**
- Fácil debugging con logs detallados
- Configuración centralizada
- Código modular y mantenible

## Monitoreo y Debugging

### **Logs del Sistema**
```typescript
// En la consola del navegador verás:
[GET categorías] URL: http://localhost:3000/api/categorias?dominio=tiendanavidena
[GET productos] URL: http://localhost:3000/api/flores?dominio=tiendanavidena&categoria=Flores
✅ Productos recomendados cargados: 4 productos
🕐 Última actualización: 15/1/2024, 10:30:45
```

### **Estados de Error**
- **Error de conexión**: Muestra productos de fallback
- **Error de categorías**: Usa categorías por defecto
- **Error de productos**: Completa con productos de respaldo

## Futuras Mejoras

### **Algoritmo de Recomendación Avanzado**
- [ ] **Machine Learning** para personalización
- [ ] **Análisis de comportamiento** del usuario
- [ ] **Recomendaciones basadas en historial** de compras
- [ ] **Filtros por precio** y disponibilidad

### **Optimizaciones de Performance**
- [ ] **Caché persistente** en localStorage
- [ ] **Prefetching** de productos relacionados
- [ ] **Lazy loading** de imágenes
- [ ] **Compresión** de respuestas de API

### **Funcionalidades Adicionales**
- [ ] **Favoritos** del usuario
- [ ] **Listas de deseos** personalizadas
- [ ] **Notificaciones** de nuevos productos
- [ ] **Compartir** recomendaciones

## Comandos de Desarrollo

```bash
# Ver logs de recomendación en tiempo real
npm run dev

# Verificar conexión con la base de datos
# Revisar consola del navegador para logs de API

# Testing del algoritmo
# Usar botón "🔄 Recargar Recomendaciones" en la página principal
```

## Soporte y Troubleshooting

### **Problemas Comunes**

1. **No se cargan productos**
   - Verificar conexión a la base de datos
   - Revisar logs en consola del navegador
   - Comprobar que el dominio "tiendanavidena" existe

2. **Productos no cambian diariamente**
   - Verificar que la fecha del sistema sea correcta
   - Limpiar caché del navegador
   - Usar botón de refresh para testing

3. **Errores de mapeo de campos**
   - Verificar estructura de la base de datos
   - Revisar mapeo en `recommendation-config.ts`
   - Comprobar nombres de campos en la API

### **Contacto**
Para soporte técnico o preguntas sobre el algoritmo:
- Revisar logs en consola del navegador
- Verificar configuración en `recommendation-config.ts`
- Comprobar conectividad con la base de datos

---

**¡El sistema de recomendación está listo y funcionando!** 🎉

Cada día verás 4 productos únicos seleccionados inteligentemente de tu base de datos, con rotación automática y sistema de fallback robusto.


