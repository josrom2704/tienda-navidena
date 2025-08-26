# Sistema de Diseño Elegante - Tienda Navideña

## 🎨 Nuevo Esquema de Colores

Hemos transformado el diseño de tu tienda de un tema **negro-dorado** a un elegante esquema **blanco-negro-dorado** que refleja la sofisticación y elegancia de los regalos gourmet.

### Paleta de Colores Principal

#### Colores Elegantes
- `elegant-black` (#0a0a0a) - Negro puro para textos principales
- `elegant-dark` (#1a1a1a) - Negro suave para fondos secundarios
- `elegant-gray` (#2d2d2d) - Gris oscuro para textos secundarios
- `elegant-light` (#f8f8f8) - Gris muy claro para fondos sutiles
- `elegant-white` (#ffffff) - Blanco puro para fondos principales

#### Colores Dorados
- `gold-400` (#fbbf24) - Dorado claro para acentos y bordes
- `gold-500` (#f59e0b) - Dorado principal para botones y elementos importantes
- `gold-600` (#d97706) - Dorado oscuro para hover states

#### Colores Crema
- `cream-50` (#fefefe) - Crema muy claro para fondos sutiles
- `cream-100` (#fdfcf9) - Crema claro para fondos de tarjetas
- `cream-200` (#faf7f0) - Crema medio para hover states

## 🔤 Sistema de Tipografías

### Tipografías Principales

#### 1. Cormorant Garamond (Elegante)
- **Clase CSS**: `title-elegant`
- **Uso**: Títulos principales, headers elegantes
- **Características**: Serif clásico, muy elegante y sofisticado

#### 2. Libre Baskerville (Clásica)
- **Clase CSS**: `title-classic`
- **Uso**: Títulos secundarios, subtítulos importantes
- **Características**: Serif clásico, legible y tradicional

#### 3. Playfair Display (Moderno)
- **Clase CSS**: `title-playfair`
- **Uso**: Títulos de secciones, elementos destacados
- **Características**: Serif moderno, elegante y contemporáneo

#### 4. Inter (Sans-serif)
- **Clase CSS**: `font-sans` (por defecto)
- **Uso**: Texto de cuerpo, navegación, elementos de interfaz
- **Características**: Sans-serif moderno, altamente legible

## 🎯 Clases CSS Disponibles

### Tipografías
```css
.title-elegant      /* Cormorant Garamond - Elegante */
.title-classic      /* Libre Baskerville - Clásica */
.title-playfair     /* Playfair Display - Moderno */
.font-sans          /* Inter - Sans-serif */
```

### Colores de Texto
```css
.text-elegant-black    /* Negro principal */
.text-elegant-dark     /* Negro suave */
.text-elegant-gray     /* Gris oscuro */
.text-elegant-light    /* Gris claro */
.text-elegant-white    /* Blanco */
.text-gold-400         /* Dorado claro */
.text-gold-500         /* Dorado principal */
.text-gold-600         /* Dorado oscuro */
```

### Fondos
```css
.bg-elegant-white      /* Fondo blanco */
.bg-elegant-light      /* Fondo gris claro */
.bg-elegant-dark       /* Fondo negro suave */
.bg-elegant-black      /* Fondo negro */
.bg-gold-400           /* Fondo dorado claro */
.bg-gold-500           /* Fondo dorado principal */
.bg-cream-50           /* Fondo crema muy claro */
.bg-cream-100          /* Fondo crema claro */
```

### Bordes
```css
.border-gold-200       /* Borde dorado muy claro */
.border-gold-400       /* Borde dorado claro */
.border-gold-500       /* Borde dorado principal */
.border-elegant-light  /* Borde gris claro */
```

### Sombras
```css
.shadow-elegant        /* Sombra elegante sutil */
.shadow-gold           /* Sombra dorada */
.shadow-subtle         /* Sombra muy sutil */
```

### Gradientes
```css
.elegant-gradient      /* Blanco a gris claro */
.gold-gradient         /* Dorado claro a oscuro */
.cream-gradient        /* Blanco a crema */
```

## 🎨 Componentes Predefinidos

### Tarjetas
```css
.elegant-card          /* Tarjeta principal con sombra y borde dorado */
.category-card         /* Tarjeta de categoría con gradiente crema */
.product-card          /* Tarjeta de producto con hover effects */
```

### Botones
```css
.gold-button           /* Botón dorado sólido */
.elegant-button        /* Botón elegante con borde dorado */
```

### Efectos
```css
.elegant-glow          /* Resplandor dorado sutil */
.elegant-border        /* Borde con resplandor */
.elegant-underline     /* Subrayado elegante en hover */
```

## 📱 Ejemplo de Uso

### Header Elegante
```tsx
<header className="bg-elegant-white border-b border-gold-200 shadow-elegant">
  <h1 className="text-3xl title-elegant text-elegant-black">
    Canastas Navideñas
  </h1>
  <nav className="text-elegant-black hover:text-gold-500">
    Inicio
  </nav>
</header>
```

### Tarjeta de Producto
```tsx
<div className="elegant-card p-6 rounded-xl">
  <h3 className="text-xl title-elegant text-elegant-black mb-3">
    Canasta Premium
  </h3>
  <p className="text-elegant-gray">
    Descripción elegante del producto
  </p>
  <button className="gold-button px-6 py-3 rounded-lg">
    Comprar Ahora
  </button>
</div>
```

### Sección Hero
```tsx
<section className="hero-section py-20">
  <div className="container mx-auto text-center">
    <h1 className="text-5xl title-elegant text-elegant-black mb-6">
      Regalos Gourmet Elegantes
    </h1>
    <p className="text-xl text-elegant-gray mb-8">
      Descubre nuestra colección exclusiva
    </p>
    <button className="elegant-button px-8 py-4 text-lg">
      Explorar Catálogo
    </button>
  </div>
</section>
```

## 🚀 Implementación

### 1. Configuración de Tailwind
El archivo `tailwind.config.ts` ya incluye todas las nuevas configuraciones de colores y tipografías.

### 2. Estilos Globales
El archivo `app/globals.css` contiene todas las clases CSS personalizadas y variables CSS.

### 3. Layout Principal
El archivo `app/layout.tsx` importa todas las tipografías de Google Fonts.

### 4. Componentes Actualizados
Los siguientes componentes ya han sido actualizados:
- ✅ Header
- ✅ Footer
- ✅ Checkout Form
- ✅ Layout principal

## 🎨 Personalización

### Agregar Nuevos Colores
```typescript
// En tailwind.config.ts
colors: {
  custom: {
    50: '#fefefe',
    100: '#fdfcf9',
    // ... más variaciones
  }
}
```

### Agregar Nuevas Tipografías
```typescript
// En app/layout.tsx
import { Nueva_Fuente } from "next/font/google"

const nuevaFuente = Nueva_Fuente({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-nueva",
})
```

## 📋 Checklist de Implementación

- [x] Configuración de Tailwind actualizada
- [x] Estilos globales renovados
- [x] Tipografías elegantes importadas
- [x] Header actualizado
- [x] Footer actualizado
- [x] Formulario de checkout actualizado
- [x] Layout principal actualizado
- [ ] Página principal actualizada
- [ ] Catálogo actualizado
- [ ] Páginas de categorías actualizadas
- [ ] Componentes de productos actualizados

## 🔍 Próximos Pasos

1. **Actualizar la página principal** con el nuevo esquema
2. **Renovar el catálogo** con las nuevas tipografías
3. **Actualizar las tarjetas de productos** con el nuevo diseño
4. **Implementar el nuevo diseño** en todas las páginas restantes
5. **Crear componentes adicionales** usando el nuevo sistema

## 💡 Consejos de Diseño

- **Usa `title-elegant`** para títulos principales y headers
- **Usa `title-classic`** para subtítulos importantes
- **Usa `title-playfair`** para elementos destacados
- **Mantén el contraste** usando `text-elegant-black` sobre fondos claros
- **Usa acentos dorados** (`text-gold-500`) para elementos importantes
- **Aplica sombras sutiles** (`shadow-elegant`) para profundidad
- **Usa gradientes crema** para fondos de tarjetas secundarias

---

**Nota**: Este sistema de diseño está optimizado para crear una experiencia visual elegante y sofisticada que refleje la calidad premium de tus productos gourmet.
