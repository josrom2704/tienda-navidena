// Configuración de PayPal para la tienda navideña
// Este archivo contiene las instrucciones para configurar PayPal en producción

export const PAYPAL_CONFIG = {
  // Configuración de desarrollo (Sandbox)
  development: {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID_SANDBOX || 'tu_client_id_sandbox_aqui',
    clientSecret: process.env.PAYPAL_CLIENT_SECRET_SANDBOX || 'tu_client_secret_sandbox_aqui',
    baseUrl: 'https://api-m.sandbox.paypal.com',
    webhookUrl: 'https://tu-dominio.com/api/paypal/webhook',
  },
  
  // Configuración de producción
  production: {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'tu_client_id_produccion_aqui',
    clientSecret: process.env.PAYPAL_CLIENT_SECRET || 'tu_client_secret_produccion_aqui',
    baseUrl: 'https://api-m.paypal.com',
    webhookUrl: 'https://tu-dominio.com/api/paypal/webhook',
  },
};

// Instrucciones para configurar PayPal:
export const PAYPAL_SETUP_INSTRUCTIONS = {
  paso1: {
    titulo: "Crear cuenta de PayPal Business",
    descripcion: "Ve a paypal.com y crea una cuenta de negocio",
    url: "https://www.paypal.com/business",
  },
  
  paso2: {
    titulo: "Obtener credenciales de API",
    descripcion: "En tu dashboard de PayPal, ve a Herramientas > API",
    url: "https://developer.paypal.com/dashboard/",
  },
  
  paso3: {
    titulo: "Configurar webhooks",
    descripcion: "Configura webhooks para recibir notificaciones de pagos",
    url: "https://developer.paypal.com/docs/api-basics/notifications/webhooks/",
  },
  
  paso4: {
    titulo: "Conectar cuenta bancaria",
    descripcion: "En PayPal, ve a Configuración > Cuentas bancarias y tarjetas",
    url: "https://www.paypal.com/myaccount/money/banks",
  },
  
  paso5: {
    titulo: "Configurar variables de entorno",
    descripcion: "Agrega las credenciales a tu archivo .env",
    ejemplo: `
      NEXT_PUBLIC_PAYPAL_CLIENT_ID=tu_client_id_aqui
      PAYPAL_CLIENT_SECRET=tu_client_secret_aqui
      NEXT_PUBLIC_PAYPAL_CLIENT_ID_SANDBOX=tu_client_id_sandbox_aqui
      PAYPAL_CLIENT_SECRET_SANDBOX=tu_client_secret_sandbox_aqui
    `,
  },
};

// Ventajas de usar PayPal para El Salvador:
export const PAYPAL_BENEFITS = {
  ventaja1: {
    titulo: "Transferencia directa a cuenta bancaria",
    descripcion: "El dinero se transfiere automáticamente a tu cuenta bancaria en El Salvador",
  },
  
  ventaja2: {
    titulo: "Acepta pagos internacionales",
    descripcion: "Los clientes pueden pagar desde cualquier país con tarjetas o cuentas PayPal",
  },
  
  ventaja3: {
    titulo: "Seguridad bancaria",
    descripcion: "PayPal cumple con estándares de seguridad bancaria internacional",
  },
  
  ventaja4: {
    titulo: "Sin necesidad de terminal POS",
    descripcion: "Procesa pagos en línea sin necesidad de equipos físicos",
  },
  
  ventaja5: {
    titulo: "Soporte en español",
    descripcion: "PayPal ofrece soporte completo en español para Latinoamérica",
  },
};

// Bancos recomendados en El Salvador para conectar con PayPal:
export const BANCOS_RECOMENDADOS = [
  {
    nombre: "Banco Agrícola",
    ventajas: ["Integración fácil", "Comisiones bajas", "Soporte local"],
  },
  {
    nombre: "Banco Cuscatlán",
    ventajas: ["Transferencias rápidas", "Buenas tarifas", "App móvil"],
  },
  {
    nombre: "Banco de América Central",
    ventajas: ["Servicio al cliente", "Horarios extendidos", "Múltiples sucursales"],
  },
  {
    nombre: "Banco Promerica",
    ventajas: ["Tecnología moderna", "Banca en línea", "Atención personalizada"],
  },
];

export default PAYPAL_CONFIG;




