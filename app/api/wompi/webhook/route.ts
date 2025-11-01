import { NextRequest, NextResponse } from 'next/server';
import EmailService from '@/lib/email-service';

// Interface para el webhook de Wompi
interface WompiWebhook {
  event: string;
  data: {
    transaction: {
      id: string;
      status: string;
      reference: string;
      amount_in_cents: number;
      currency: string;
      created_at: string;
      customer_email: string;
      payment_method?: {
        type: string;
        extra?: any;
      };
    };
    merchant: {
      name: string;
    };
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: WompiWebhook = await request.json();

    console.log('📦 Webhook recibido de Wompi:', JSON.stringify(body, null, 2));

    // Verificar que sea un evento de transacción
    if (body.event !== 'transaction.updated' && body.event !== 'transaction.created') {
      console.log('⚠️ Evento no relevante:', body.event);
      return NextResponse.json({ received: true });
    }

    const transaction = body.data.transaction;
    const status = transaction.status?.toUpperCase();

    // Solo procesar transacciones aprobadas
    if (status === 'APPROVED') {
      console.log('✅ Transacción aprobada, procesando pedido...');
      
      try {
        // Obtener los detalles del pedido usando nuestra API interna
        let orderDetails = null;

        try {
          const orderResponse = await fetch(`${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/orders?orderNumber=${transaction.reference}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (orderResponse.ok) {
            orderDetails = await orderResponse.json();
            console.log('📋 Detalles del pedido obtenidos:', orderDetails);
          }
        } catch (error) {
          console.warn('⚠️ Error obteniendo pedido:', error);
        }

        // Si no se pudo obtener, usar datos mínimos de la transacción
        if (!orderDetails) {
          console.warn('⚠️ No se pudieron obtener los detalles del pedido, usando datos mínimos');
          orderDetails = {
            orderNumber: transaction.reference,
            items: [], // Se llenará con datos mínimos
            total: transaction.amount_in_cents / 100,
            shippingAddress: {
              name: transaction.customer_email.split('@')[0],
              address: '',
              city: '',
              state: '',
              zipCode: '',
              country: 'El Salvador',
            },
            customerInfo: {
              email: transaction.customer_email,
              phone: '',
            },
            specialInstructions: '',
            giftWrap: false,
            giftMessage: '',
          };
        }

        // Preparar datos para el email
        const emailOrderDetails = {
          orderNumber: transaction.reference,
          items: orderDetails.items || [],
          total: orderDetails.total || (transaction.amount_in_cents / 100),
          shippingAddress: orderDetails.shippingAddress || {
            name: transaction.customer_email.split('@')[0],
            address: '',
            city: '',
            state: '',
            zipCode: '',
            country: 'El Salvador',
          },
          customerInfo: {
            email: transaction.customer_email,
            phone: orderDetails.customerInfo?.phone || '',
          },
          specialInstructions: orderDetails.specialInstructions || '',
          giftWrap: orderDetails.giftWrap || false,
          giftMessage: orderDetails.giftMessage || '',
        };

        // Enviar email de confirmación al cliente
        const emailService = EmailService.getInstance();
        const emailSent = await emailService.sendOrderConfirmation(emailOrderDetails);

        if (emailSent) {
          console.log('✅ Email de confirmación enviado al cliente');
        } else {
          console.error('❌ Error al enviar email de confirmación');
        }

        // Enviar notificación al administrador
        const adminEmailSent = await emailService.sendOrderNotificationToAdmin(emailOrderDetails);

        if (adminEmailSent) {
          console.log('✅ Notificación enviada al administrador');
        } else {
          console.error('❌ Error al enviar notificación al administrador');
        }

      } catch (error) {
        console.error('❌ Error procesando el pedido:', error);
        // No fallar el webhook, solo logear el error
      }
    } else {
      console.log(`ℹ️ Transacción en estado ${status}, no se envía email`);
    }

    // Siempre responder 200 para que Wompi sepa que recibimos el webhook
    return NextResponse.json({ 
      received: true,
      status: 'processed'
    });

  } catch (error) {
    console.error('❌ Error procesando webhook de Wompi:', error);
    // Devolver 200 para evitar que Wompi reintente constantemente
    return NextResponse.json({ 
      received: true,
      error: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 200 });
  }
}

// Permitir GET para verificación
export async function GET() {
  return NextResponse.json({ 
    message: 'Wompi webhook endpoint is active',
    timestamp: new Date().toISOString()
  });
}

