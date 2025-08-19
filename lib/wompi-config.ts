// Configuración de Wompi para procesamiento de pagos
export const WOMPI_CONFIG = {
  // Credenciales OAuth 2.0
  oauth: {
    tokenUrl: 'https://id.wompi.sv/connect/token',
    audience: 'wompi_api',
    grantType: 'client_credentials'
  },
  
  // Credenciales del aplicativo
  credentials: {
    clientId: process.env.NEXT_PUBLIC_WOMPI_CLIENT_ID || '670b06ca-2e3b-4818-a07a-18c22055e3a1',
    clientSecret: process.env.WOMPI_CLIENT_SECRET || '9eac51bc-f0ca-4f26-823b-9656e3b618d5'
  },
  
  // URLs de la API
  apiUrls: {
    base: 'https://api.wompi.sv',
    paymentLinks: '/EnlacePago',
    transactions: '/Transaccion'
  },
  
  // Configuración de moneda
  currency: 'USD', // Dólar estadounidense (Wompi SV usa USD)
  
  // Configuración de aceptación
  acceptance: {
    type: 'END_USER',
    acceptance_token: process.env.NEXT_PUBLIC_WOMPI_ACCEPTANCE_TOKEN || 'acceptance_token_placeholder'
  },
  
  // Modo de simulación para desarrollo
  simulation: {
    enabled: process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_WOMPI_CLIENT_ID,
    mockResponse: {
      success: true,
      transaction_id: 'sim_123456789',
      payment_url: 'https://simulation.wompi.sv/pay',
      status: 'APPROVED'
    }
  }
};

// Función para obtener la configuración actual
export function getWompiConfig() {
  return {
    ...WOMPI_CONFIG.oauth,
    ...WOMPI_CONFIG.credentials,
    apiUrl: WOMPI_CONFIG.apiUrls.base
  };
}

// Función para obtener las credenciales OAuth
export function getWompiCredentials() {
  return {
    clientId: WOMPI_CONFIG.credentials.clientId,
    clientSecret: WOMPI_CONFIG.credentials.clientSecret
  };
}

// Función para obtener la URL de la API
export function getWompiApiUrl() {
  return WOMPI_CONFIG.apiUrls.base;
}

// Función para obtener la URL de autenticación
export function getWompiAuthUrl() {
  return WOMPI_CONFIG.oauth.tokenUrl;
}

// Función para verificar si estamos en modo simulación
export function isSimulationMode() {
  return WOMPI_CONFIG.simulation.enabled;
}

// Función para obtener respuesta de simulación
export function getSimulationResponse() {
  return WOMPI_CONFIG.simulation.mockResponse;
}
