# 🌟 Tienda Navideña - E-commerce con Next.js y Wompi

Una tienda en línea moderna y elegante para arreglos florales y regalos navideños, construida con Next.js 15 y integrada con Wompi para procesamiento de pagos.

## ✨ Características

- 🛍️ **Catálogo de productos** con categorías
- 🛒 **Carrito de compras** funcional
- 💳 **Integración con Wompi** para pagos
- 📱 **Diseño responsive** y moderno
- 🎨 **UI/UX elegante** con Tailwind CSS
- ⚡ **Rendimiento optimizado** con Next.js 15
- 🔒 **Autenticación OAuth 2.0** con Wompi
- 📊 **Panel de administración** integrado

## 🚀 Tecnologías

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, CSS Modules
- **Estado**: React Context, Hooks
- **Pagos**: Wompi API (OAuth 2.0)
- **Base de datos**: MySQL/PostgreSQL
- **Despliegue**: Vercel, GitHub Actions

## 📦 Instalación

### Prerrequisitos
- Node.js 18+ 
- npm o yarn
- Git

### Pasos
```bash
# Clonar repositorio
git clone https://github.com/josrom2704/tienda-navidena.git
cd tienda-navidena

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build
```

## 🔧 Configuración

### Variables de entorno
```bash
# API
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Wompi (cuando tengas credenciales)
WOMPI_CLIENT_ID=tu_client_id
WOMPI_CLIENT_SECRET=tu_client_secret
NEXT_PUBLIC_WOMPI_ACCEPTANCE_TOKEN=tu_token
```

## 🌐 Despliegue

### Vercel (Recomendado)
1. Conecta tu repositorio de GitHub
2. Configura las variables de entorno
3. ¡Despliegue automático en cada push!

### Manual
```bash
npm run build
npm start
```

## 📱 Estructura del proyecto

```
tienda-navidena/
├── app/                 # App Router de Next.js
├── components/          # Componentes React
├── hooks/              # Custom hooks
├── lib/                # Utilidades y configuraciones
├── styles/             # Estilos globales
└── public/             # Archivos estáticos
```

## 🎯 Funcionalidades principales

### Catálogo
- Navegación por categorías
- Búsqueda de productos
- Filtros avanzados

### Carrito
- Agregar/remover productos
- Cálculo automático de totales
- Persistencia de datos

### Checkout
- Formulario de información del cliente
- Integración con Wompi
- Confirmación de pedido

### Admin
- Gestión de productos
- Gestión de categorías
- Panel de estadísticas

## 🔗 Integración Wompi

- **OAuth 2.0** para autenticación
- **Enlaces de pago** para e-commerce
- **Verificación de transacciones**
- **Webhooks** para notificaciones

## 📈 Roadmap

- [ ] Sistema de usuarios y cuentas
- [ ] Historial de pedidos
- [ ] Notificaciones por email
- [ ] Sistema de cupones
- [ ] Múltiples métodos de pago
- [ ] App móvil (React Native)

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 📞 Soporte

- **Email**: tu-email@ejemplo.com
- **Issues**: [GitHub Issues](https://github.com/josrom2704/tienda-navidena/issues)

## 🙏 Agradecimientos

- [Next.js](https://nextjs.org/) por el framework
- [Tailwind CSS](https://tailwindcss.com/) por los estilos
- [Wompi](https://wompi.sv/) por la pasarela de pagos
- [Vercel](https://vercel.com/) por el hosting

---

⭐ **Si te gusta este proyecto, dale una estrella en GitHub!**
