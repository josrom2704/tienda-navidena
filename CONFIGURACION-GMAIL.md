# 📧 Configuración de Gmail para Envío de Correos

## ✅ Pasos para Configurar Gmail SMTP

### Paso 1: Habilitar verificación en 2 pasos en tu cuenta de Gmail

1. Ve a tu cuenta de Google: https://myaccount.google.com/
2. Ve a **Seguridad**
3. Activa **Verificación en 2 pasos** (si no la tienes activada)

### Paso 2: Crear una Contraseña de Aplicación

1. Ve a: https://myaccount.google.com/apppasswords
2. Si no ves esta opción, primero debes activar la verificación en 2 pasos
3. Selecciona:
   - **Aplicación**: "Correo"
   - **Dispositivo**: "Otro (nombre personalizado)"
   - Ingresa: "Tienda Navideña"
4. Haz clic en **Generar**
5. **COPIA LA CONTRASEÑA** que te muestra (16 caracteres, sin espacios)
   - Ejemplo: `abcd efgh ijkl mnop`
   - Úsala como: `abcdefghijklmnop` (sin espacios)

### Paso 3: Configurar Variables de Entorno

Crea o actualiza tu archivo `.env.local` en la raíz del proyecto:

```env
# Configuración de Gmail SMTP
GMAIL_USER=tu-correo@gmail.com
GMAIL_APP_PASSWORD=abcdefghijklmnop
```

**⚠️ IMPORTANTE:**
- `GMAIL_USER`: Tu correo Gmail completo (ej: `clientesfloristeria@gmail.com`)
- `GMAIL_APP_PASSWORD`: La contraseña de 16 caracteres que generaste (SIN ESPACIOS)
- **NUNCA** subas el archivo `.env.local` a GitHub (ya debería estar en `.gitignore`)

### Paso 4: Configurar en Producción (Vercel/Netlify)

Si usas Vercel, Netlify u otro servicio:

1. Ve a la configuración de tu proyecto
2. Agrega las variables de entorno:
   - `GMAIL_USER` = `tu-correo@gmail.com`
   - `GMAIL_APP_PASSWORD` = `tu-contraseña-de-aplicacion`

### Paso 5: Reiniciar el Servidor

Después de configurar las variables de entorno:

```bash
# Detener el servidor (Ctrl+C)
# Reiniciar
npm run dev
```

## ✅ Verificación

1. Haz una compra de prueba
2. Verifica que recibas:
   - Correo de confirmación al cliente
   - Notificación a `clientesfloristeria@gmail.com`

## 🔒 Seguridad

- **NO compartas** tu contraseña de aplicación
- **NO** subas `.env.local` a repositorios públicos
- Puedes revocar la contraseña de aplicación en cualquier momento desde:
  https://myaccount.google.com/apppasswords

## ⚠️ Límites de Gmail

- **500 correos por día** (límite gratuito de Gmail)
- Para más volumen, considera usar un servicio profesional

## 🆘 Solución de Problemas

### Error: "Invalid login"
- Verifica que copiaste la contraseña de aplicación correctamente (sin espacios)
- Asegúrate de que la verificación en 2 pasos esté activada

### Error: "Less secure app access"
- Ya no necesitas habilitar "acceso de aplicaciones menos seguras"
- Usa contraseñas de aplicación en su lugar

### Los correos no llegan
- Revisa la carpeta de Spam
- Verifica los logs en la consola del servidor
- Verifica que las variables de entorno estén correctas

