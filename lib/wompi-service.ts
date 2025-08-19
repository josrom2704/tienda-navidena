// Servicio de Wompi para procesamiento de pagos
import { getWompiConfig, getWompiApiUrl, getWompiAuthUrl, getWompiCredentials, isSimulationMode, getSimulationResponse } from './wompi-config';

export interface WompiPaymentRequest {
  amount_in_cents: number;
  currency: string;
  reference: string;
  public_key: string;
  acceptance_token: string;
  customer_email: string;
  payment_method: {
    type: string;
    installments?: number;
  };
  payment_link_id?: string;
  redirect_url?: string;
}

export interface WompiPaymentResponse {
  success: boolean;
  transaction_id?: string;
  payment_url?: string;
  error?: string;
  status?: string;
}

export interface WompiTransaction {
  id: string;
  status: string;
  amount_in_cents: number;
  currency: string;
  reference: string;
  customer_email: string;
  payment_method: {
    type: string;
    installments?: number;
  };
  created_at: string;
  updated_at: string;
}

export class WompiService {
  private static instance: WompiService;
  private config: any;
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;

  private constructor() {
    this.config = getWompiConfig();
  }

  public static getInstance(): WompiService {
    if (!WompiService.instance) {
      WompiService.instance = new WompiService();
    }
    return WompiService.instance;
  }

  // Obtener token de acceso OAuth 2.0
  private async getAccessToken(): Promise<string> {
    // Verificar si el token actual es válido
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    try {
      console.log('🔐 Obteniendo token de acceso OAuth...');
      
      // Usar nuestra API route local para evitar CORS
      const response = await fetch('/api/wompi/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Error de autenticación:', response.status, errorText);
        throw new Error(`Error de autenticación: ${response.status} - ${errorText}`);
      }

      const tokenData = await response.json();
      this.accessToken = tokenData.access_token || null;
      this.tokenExpiry = Date.now() + ((tokenData.expires_in || 3600) * 1000);

      if (!this.accessToken) {
        throw new Error('No se pudo obtener el token de acceso');
      }

      console.log('✅ Token de acceso obtenido exitosamente');
      return this.accessToken;

    } catch (error) {
      console.error('❌ Error obteniendo token de acceso:', error);
      throw error;
    }
  }

  // Crear una transacción de pago
  public async createPaymentTransaction(paymentData: WompiPaymentRequest): Promise<WompiPaymentResponse> {
    try {
      console.log('💰 Creando transacción de pago en Wompi...');
      
      // Obtener token de acceso OAuth
      const accessToken = await this.getAccessToken();
      
      const apiUrl = getWompiApiUrl();
      const response = await fetch(`${apiUrl}/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(paymentData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Error en Wompi:', response.status, errorText);
        throw new Error(`Error en Wompi: ${response.status} - ${errorText}`);
      }

      const transactionData = await response.json();
      console.log('✅ Transacción creada exitosamente:', transactionData);

      return {
        success: true,
        transaction_id: transactionData.id,
        payment_url: transactionData.payment_url,
        status: transactionData.status
      };

    } catch (error) {
      console.error('❌ Error creando transacción:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido'
      };
    }
  }

  // Verificar el estado de una transacción
  public async verifyTransactionStatus(transactionId: string): Promise<WompiPaymentResponse> {
    try {
      // Verificar si estamos en modo simulación
      if (isSimulationMode()) {
        console.log('🎭 Modo simulación activado - Simulando verificación...');
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simular delay
        
        const simResponse = getSimulationResponse();
        console.log('✅ Verificación simulada:', simResponse);
        
        return {
          success: true,
          transaction_id: transactionId,
          status: simResponse.status
        };
      }
      
      console.log('🔍 Verificando estado de transacción:', transactionId);
      
      // Obtener token de acceso OAuth
      const accessToken = await this.getAccessToken();
      
      const apiUrl = getWompiApiUrl();
      const response = await fetch(`${apiUrl}/transactions/${transactionId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        throw new Error(`Error verificando transacción: ${response.status}`);
      }

      const transactionData: WompiTransaction = await response.json();
      console.log('✅ Estado de transacción:', transactionData.status);

      return {
        success: true,
        transaction_id: transactionId,
        status: transactionData.status
      };

    } catch (error) {
      console.error('❌ Error verificando transacción:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido'
      };
    }
  }

  // Crear un enlace de pago
  public async createPaymentLink(paymentData: Omit<WompiPaymentRequest, 'payment_method'>): Promise<WompiPaymentResponse> {
    try {
      // Verificar si estamos en modo simulación
      if (isSimulationMode()) {
        console.log('🎭 Modo simulación activado - Simulando enlace de pago...');
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simular delay
        
        const simResponse = getSimulationResponse();
        console.log('✅ Enlace de pago simulado:', simResponse);
        
        return {
          success: true,
          payment_url: simResponse.payment_url,
          transaction_id: simResponse.transaction_id
        };
      }
      
      console.log('🔗 Creando enlace de pago a través del backend...');
      
      // Usar tu backend existente para evitar problemas de API routes
      const response = await fetch('https://flores-backend-px2c.onrender.com/api/wompi/payment-links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount_in_cents: paymentData.amount_in_cents,
          currency: paymentData.currency,
          reference: paymentData.reference,
          customer_email: paymentData.customer_email,
          expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Error creando enlace:', response.status, errorText);
        throw new Error(`Error creando enlace: ${response.status} - ${errorText}`);
      }

      const linkData = await response.json();
      console.log('✅ Enlace de pago creado:', linkData);

      return {
        success: true,
        payment_url: linkData.payment_url,
        transaction_id: linkData.transaction_id
      };

    } catch (error) {
      console.error('❌ Error creando enlace de pago:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido'
      };
    }
  }

  // Procesar pago con tarjeta
  public async processCardPayment(paymentData: WompiPaymentRequest): Promise<WompiPaymentResponse> {
    try {
      console.log('💳 Procesando pago con tarjeta...');
      
      // Crear la transacción
      const transaction = await this.createPaymentTransaction(paymentData);
      
      if (!transaction.success) {
        return transaction;
      }

      // Verificar el estado después de un breve delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (transaction.transaction_id) {
        return await this.verifyTransactionStatus(transaction.transaction_id);
      }

      return transaction;

    } catch (error) {
      console.error('❌ Error procesando pago con tarjeta:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido'
      };
    }
  }
}

export default WompiService;
