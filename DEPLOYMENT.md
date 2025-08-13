# 🚀 Guía de Despliegue - Tienda Navideña

## 📋 Pasos para desplegar en Vercel

### **1. Crear cuenta en Vercel**
- Ve a [vercel.com](https://vercel.com)
- Haz clic en **"Sign Up"**
- Usa tu cuenta de GitHub, Google, o crea una nueva

### **2. Conectar tu repositorio**
- En Vercel, haz clic en **"New Project"**
- Conecta tu repositorio de GitHub/GitLab
- O sube los archivos manualmente

### **3. Configurar variables de entorno**
En Vercel, ve a **Settings > Environment Variables** y agrega:

```bash
# Configuración de la API
NEXT_PUBLIC_API_URL=https://tu-dominio.vercel.app/api

# Configuración de Wompi (cuando las tengas)
WOMPI_CLIENT_ID=tu_client_id_aqui
WOMPI_CLIENT_SECRET=tu_client_secret_aqui
NEXT_PUBLIC_WOMPI_ACCEPTANCE_TOKEN=tu_acceptance_token_aqui
```

### **4. Desplegar**
- Haz clic en **"Deploy"**
- Espera a que termine el despliegue
- Tu URL será: `https://tienda-navidena-abc123.vercel.app`

## 🌐 Configuración de Wompi

### **1. Usar la URL de Vercel**
- Ve a [Wompi Dashboard](https://panel.wompi.sv)
- **"Crea tu negocio"**
- En **"Redirect URL"** pon tu URL de Vercel
- Completa el resto del formulario

### **2. Obtener credenciales**
- **App ID** → `WOMPI_CLIENT_ID`
- **API Secret** → `WOMPI_CLIENT_SECRET`

## 🔧 Comandos útiles

```bash
# Desplegar manualmente
vercel

# Desplegar a producción
vercel --prod

# Ver logs
vercel logs

# Actualizar configuración
vercel env add
```

## 📱 URLs importantes

- **Frontend**: `https://tu-dominio.vercel.app`
- **API**: `https://tu-dominio.vercel.app/api`
- **Admin**: `https://tu-dominio.vercel.app/admin`

## 🆘 Solución de problemas

### **Error de compilación**
```bash
npm run build
```

### **Error de dependencias**
```bash
npm install
```

### **Limpiar cache**
```bash
npm cache clean --force
```
