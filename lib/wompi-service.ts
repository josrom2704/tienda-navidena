// Servicio de Wompi para procesamiento de pagos
import { isSimulationMode, getSimulationResponse } from './wompi-config';

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

export class WompiService {
  private static instance: WompiService;

  private constructor() {}

  public static getInstance(): WompiService {
    if (!WompiService.instance) {
      WompiService.instance = new WompiService();
    }
    return WompiService.instance;
  }

  // Crear un enlace de pago
  public async createPaymentLink(paymentData: Omit<WompiPaymentRequest, 'payment_method'>): Promise<WompiPaymentResponse> {
    try {
      // Verificar si estamos en modo simulación
      if (isSimulationMode()) {
        console.log('🎭 Modo simulación activado - Simulando enlace de pago...');
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const simResponse = getSimulationResponse();
        console.log('✅ Enlace de pago simulado:', simResponse);
        
        return {
          success: true,
          payment_url: simResponse.payment_url,
          transaction_id: simResponse.transaction_id,
          status: 'APPROVED'
        };
      }
      
      const apiUrl = 'https://flores-backend-px2c.onrender.com/api/wompi/create-payment';
      console.log('🔗 Creando enlace de pago a través de nuestra API...');
      console.log('📍 URL de la API:', apiUrl);
      console.log('📋 Datos del pago:', paymentData);
      
      const response = await fetch(apiUrl, {
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

      console.log('📡 Respuesta de la API:', response.status, response.statusText);

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
        transaction_id: linkData.transaction_id,
        status: 'PENDING'
      };

    } catch (error) {
      console.error('❌ Error creando enlace de pago:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido'
      };
    }
  }
}

export default WompiService;