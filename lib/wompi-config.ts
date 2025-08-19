// Configuración de Wompi
export const WOMPI_CONFIG = {
  // Credenciales del aplicativo
  credentials: {
    clientId: process.env.NEXT_PUBLIC_WOMPI_CLIENT_ID || 'c9ba55f7-c614-4a74-8e54-0c5e00d376d0',
    clientSecret: process.env.NEXT_PUBLIC_WOMPI_CLIENT_SECRET || 'bc6c4920-1da5-4ea5-b7db-12e9de63237c'
  },
  
  // URLs de la API
  apiUrls: {
    base: 'https://api.wompi.sv',
    paymentLinks: '/payment_links',
    transactions: '/transactions'
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
      payment_url: 'https://example.com/simulated-payment'
    }
  }
};

// Obtener credenciales de Wompi
export const getWompiCredentials = () => ({
  clientId: WOMPI_CONFIG.credentials.clientId,
  clientSecret: WOMPI_CONFIG.credentials.clientSecret
});

// Obtener URL de autenticación
export const getWompiAuthUrl = () => 'https://id.wompi.sv/connect/token';

// Obtener URL de la API
export const getWompiApiUrl = () => WOMPI_CONFIG.apiUrls.base;

// Verificar si estamos en modo simulación
export const isSimulationMode = () => WOMPI_CONFIG.simulation.enabled;

// Obtener respuesta de simulación
export const getSimulationResponse = () => WOMPI_CONFIG.simulation.mockResponse;
