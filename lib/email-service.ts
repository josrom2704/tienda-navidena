// Servicio de email simulado para confirmaciones de pedido
// En producción, esto se conectaría con un servicio real como SendGrid, Mailgun, etc.

export interface OrderDetails {
  orderNumber: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    total: number;
  }>;
  total: number;
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  customerInfo: {
    email: string;
    phone: string;
  };
  specialInstructions?: string;
  giftWrap: boolean;
  giftMessage?: string;
}

export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

export class EmailService {
  private static instance: EmailService;

  private constructor() {}

  public static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  public async sendOrderConfirmation(orderDetails: OrderDetails): Promise<boolean> {
    try {
      // Simular envío de email
      console.log('📧 Enviando email de confirmación...');
      
      const emailTemplate = this.generateOrderConfirmationEmail(orderDetails);
      
      // Simular delay de envío
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('✅ Email enviado exitosamente a:', orderDetails.customerInfo.email);
      console.log('📧 Asunto:', emailTemplate.subject);
      
      // En producción, aquí se enviaría el email real
      // await this.sendEmail(orderDetails.customerInfo.email, emailTemplate);
      
      return true;
    } catch (error) {
      console.error('❌ Error enviando email:', error);
      return false;
    }
  }

  public async sendOrderNotificationToAdmin(orderDetails: OrderDetails): Promise<boolean> {
    try {
      console.log('📧 Enviando notificación al administrador...');
      
      const emailTemplate = this.generateAdminNotificationEmail(orderDetails);
      
      // Simular delay de envío
      await new Promise(resolve => setTimeout(resolve, 800));
      
      console.log('✅ Notificación enviada al administrador');
      
      return true;
    } catch (error) {
      console.error('❌ Error enviando notificación al admin:', error);
      return false;
    }
  }

  private generateOrderConfirmationEmail(orderDetails: OrderDetails): EmailTemplate {
    const subject = `¡Pedido Confirmado! - ${orderDetails.orderNumber}`;
    
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Confirmación de Pedido</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #fbbf24, #f59e0b); padding: 30px; text-align: center; border-radius: 10px; }
          .header h1 { color: #1f2937; margin: 0; font-size: 28px; }
          .content { background: #f9fafb; padding: 30px; border-radius: 10px; margin-top: 20px; }
          .order-number { background: #1f2937; color: #fbbf24; padding: 15px; border-radius: 8px; text-align: center; font-size: 24px; font-weight: bold; margin: 20px 0; }
          .item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
          .total { font-size: 20px; font-weight: bold; color: #1f2937; text-align: right; margin-top: 20px; padding-top: 20px; border-top: 2px solid #fbbf24; }
          .shipping-info { background: #e5e7eb; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎄 Tienda Navideña</h1>
            <p style="color: #1f2937; font-size: 18px; margin: 10px 0 0 0;">¡Tu pedido ha sido confirmado!</p>
          </div>
          
          <div class="content">
            <h2>¡Gracias por tu compra!</h2>
            <p>Hola ${orderDetails.shippingAddress.name},</p>
            <p>Tu pedido ha sido procesado exitosamente y está siendo preparado con el mayor cuidado.</p>
            
            <div class="order-number">
              ${orderDetails.orderNumber}
            </div>
            
            <h3>📦 Productos en tu pedido:</h3>
            ${orderDetails.items.map(item => `
              <div class="item">
                <span>${item.name} x${item.quantity}</span>
                <span>$${item.total.toLocaleString()}</span>
              </div>
            `).join('')}
            
            ${orderDetails.giftWrap ? `
              <div class="item">
                <span>🎁 Empaque de regalo</span>
                <span>$50</span>
              </div>
            ` : ''}
            
            <div class="item">
              <span>🚚 Envío</span>
              <span>${orderDetails.total >= 250 ? 'Gratuito' : '$3'}</span>
            </div>
            
            <div class="total">
              Total: $${(orderDetails.total + (orderDetails.giftWrap ? 50 : 0) + (orderDetails.total >= 250 ? 0 : 3)).toLocaleString()}
            </div>
            
            <div class="shipping-info">
              <h4>🚚 Dirección de envío:</h4>
              <p><strong>${orderDetails.shippingAddress.name}</strong></p>
              <p>${orderDetails.shippingAddress.address}</p>
              <p>${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.state} ${orderDetails.shippingAddress.zipCode}</p>
              <p>${orderDetails.shippingAddress.country}</p>
            </div>
            
            ${orderDetails.giftMessage ? `
              <div class="shipping-info">
                <h4>💝 Mensaje del regalo:</h4>
                <p><em>"${orderDetails.giftMessage}"</em></p>
              </div>
            ` : ''}
            
            ${orderDetails.specialInstructions ? `
              <div class="shipping-info">
                <h4>📝 Instrucciones especiales:</h4>
                <p>${orderDetails.specialInstructions}</p>
              </div>
            ` : ''}
            
            <h3>⏰ Próximos pasos:</h3>
            <ul>
              <li><strong>24 horas:</strong> Tu pedido será preparado y empaquetado</li>
              <li><strong>24-48 horas:</strong> Envío con entrega gratuita</li>
              <li><strong>Recibirás:</strong> Email con número de seguimiento</li>
            </ul>
            
            <p style="margin-top: 30px;">
              Si tienes alguna pregunta, no dudes en contactarnos en 
              <a href="mailto:soporte@tiendanavidena.com" style="color: #f59e0b;">soporte@tiendanavidena.com</a> o al +503 2123 4567
            </p>
          </div>
          
          <div class="footer">
            <p>© 2024 Tienda Navideña. Todos los derechos reservados.</p>
            <p>Este email fue enviado a ${orderDetails.customerInfo.email}</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    const text = `
      ¡Pedido Confirmado! - ${orderDetails.orderNumber}
      
      Hola ${orderDetails.shippingAddress.name},
      
      Tu pedido ha sido procesado exitosamente y está siendo preparado con el mayor cuidado.
      
      Número de orden: ${orderDetails.orderNumber}
      
      Productos en tu pedido:
      ${orderDetails.items.map(item => `- ${item.name} x${item.quantity}: $${item.total.toLocaleString()}`).join('\n')}
      ${orderDetails.giftWrap ? '- Empaque de regalo: $50' : ''}
      - Envío: ${orderDetails.total >= 250 ? 'Gratuito' : '$3'}
      
      Total: $${(orderDetails.total + (orderDetails.giftWrap ? 50 : 0) + (orderDetails.total >= 250 ? 0 : 3)).toLocaleString()}
      
      Dirección de envío:
      ${orderDetails.shippingAddress.name}
      ${orderDetails.shippingAddress.address}
      ${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.state} ${orderDetails.shippingAddress.zipCode}
      ${orderDetails.shippingAddress.country}
      
      ${orderDetails.giftMessage ? `Mensaje del regalo: "${orderDetails.giftMessage}"` : ''}
      
      ${orderDetails.specialInstructions ? `Instrucciones especiales: ${orderDetails.specialInstructions}` : ''}
      
      Próximos pasos:
      - 24 horas: Tu pedido será preparado y empaquetado
      - 24-48 horas: Envío con entrega gratuita
      - Recibirás: Email con número de seguimiento
      
      Si tienes alguna pregunta, contáctanos en soporte@tiendanavidena.com o al +503 2123 4567
      
      © 2024 Tienda Navideña. Todos los derechos reservados.
    `;
    
    return { subject, html, text };
  }

  private generateAdminNotificationEmail(orderDetails: OrderDetails): EmailTemplate {
    const subject = `Nuevo Pedido Recibido - ${orderDetails.orderNumber}`;
    
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Nuevo Pedido</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #dc2626; color: white; padding: 20px; text-align: center; border-radius: 10px; }
          .content { background: #f9fafb; padding: 20px; border-radius: 10px; margin-top: 20px; }
          .order-number { background: #1f2937; color: #fbbf24; padding: 15px; border-radius: 8px; text-align: center; font-size: 20px; font-weight: bold; margin: 20px 0; }
          .item { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
          .total { font-size: 18px; font-weight: bold; color: #1f2937; text-align: right; margin-top: 15px; padding-top: 15px; border-top: 2px solid #dc2626; }
          .customer-info { background: #e5e7eb; padding: 15px; border-radius: 8px; margin: 15px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🆕 Nuevo Pedido Recibido</h1>
          </div>
          
          <div class="content">
            <div class="order-number">
              ${orderDetails.orderNumber}
            </div>
            
            <h3>📦 Productos:</h3>
            ${orderDetails.items.map(item => `
              <div class="item">
                <span>${item.name} x${item.quantity}</span>
                <span>$${item.total.toLocaleString()}</span>
              </div>
            `).join('')}
            
            ${orderDetails.giftWrap ? `
              <div class="item">
                <span>🎁 Empaque de regalo</span>
                <span>$50</span>
              </div>
            ` : ''}
            
            <div class="total">
              Total: $${(orderDetails.total + (orderDetails.giftWrap ? 50 : 0)).toLocaleString()}
            </div>
            
            <div class="customer-info">
              <h4>👤 Cliente:</h4>
              <p><strong>${orderDetails.shippingAddress.name}</strong></p>
              <p>📧 ${orderDetails.customerInfo.email}</p>
              <p>📱 ${orderDetails.customerInfo.phone}</p>
              <p>📍 ${orderDetails.shippingAddress.address}, ${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.state}</p>
            </div>
            
            <p><strong>Fecha:</strong> ${new Date().toLocaleString('es-MX')}</p>
            
            <p style="margin-top: 20px;">
              <a href="#" style="background: #dc2626; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                Ver Detalles Completos
              </a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    const text = `
      Nuevo Pedido Recibido - ${orderDetails.orderNumber}
      
      Productos:
      ${orderDetails.items.map(item => `- ${item.name} x${item.quantity}: $${item.total.toLocaleString()}`).join('\n')}
      ${orderDetails.giftWrap ? '- Empaque de regalo: $50' : ''}
      
      Total: $${(orderDetails.total + (orderDetails.giftWrap ? 50 : 0)).toLocaleString()}
      
      Cliente:
      ${orderDetails.shippingAddress.name}
      Email: ${orderDetails.customerInfo.email}
      Teléfono: ${orderDetails.customerInfo.phone}
      Dirección: ${orderDetails.shippingAddress.address}, ${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.state}
      
      Fecha: ${new Date().toLocaleString('es-MX')}
    `;
    
    return { subject, html, text };
  }

  // Método para enviar email real (en producción)
  private async sendEmail(to: string, template: EmailTemplate): Promise<boolean> {
    // Aquí se implementaría la lógica real de envío de email
    // Por ejemplo, usando SendGrid, Mailgun, AWS SES, etc.
    
    const emailData = {
      to,
      subject: template.subject,
      html: template.html,
      text: template.text,
    };
    
    console.log('📧 Datos del email a enviar:', emailData);
    
    // Simular respuesta exitosa
    return true;
  }
}

export default EmailService;
