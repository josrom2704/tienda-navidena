// Configuración de Wompi para usar con backend
export const WOMPI_CONFIG = {
  // URL del backend
  backendUrl: 'https://flores-backend-px2c.onrender.com/api/wompi',
  
  // Configuración de moneda
  currency: 'USD',
  
  // Modo de simulación para desarrollo
  simulation: {
    enabled: process.env.NODE_ENV === 'development',
    mockResponse: {
      success: true,
      transaction_id: 'sim_123456789',
      payment_url: 'https://example.com/simulated-payment'
    }
  }
};

// Obtener URL del backend
export const getBackendUrl = () => WOMPI_CONFIG.backendUrl;

// Verificar si estamos en modo simulación
export const isSimulationMode = () => WOMPI_CONFIG.simulation.enabled;

// Obtener respuesta de simulación
export const getSimulationResponse = () => WOMPI_CONFIG.simulation.mockResponse;
