import { NextResponse } from 'next/server';

// Método GET para probar que la ruta funciona
export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Ruta /api/wompi-pay funcionando correctamente',
    timestamp: new Date().toISOString()
  });
}

export async function POST(request: Request) {
  try {
    console.log('🔗 Creando enlace de pago en Wompi...');
    
    const body = await request.json();
    const { amount_in_cents, currency, reference, customer_email, expires_at } = body;

    // Primero obtener el token de acceso
    const authResponse = await fetch('https://id.wompi.sv/connect/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: 'c9ba55f7-c614-4a74-8e54-0c5e00d376d0',
        client_secret: 'bc6c4920-1da5-4ea5-b7db-12e9de63237c',
        audience: 'wompi_api'
      })
    });

    if (!authResponse.ok) {
      const errorText = await authResponse.text();
      console.error('❌ Error de autenticación:', authResponse.status, errorText);
      return NextResponse.json(
        { error: `Error de autenticación: ${authResponse.status}` },
        { status: authResponse.status }
      );
    }

    const authData = await authResponse.json();
    const accessToken = authData.access_token;

    console.log('✅ Token obtenido, creando enlace de pago...');

    // Crear el enlace de pago
    const paymentResponse = await fetch('https://api.wompi.sv/payment_links', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        amount_in_cents,
        currency,
        reference,
        customer_email,
        expires_at,
        redirect_url: 'https://tienda-navidenau.vercel.app/checkout/success'
      })
    });

    if (!paymentResponse.ok) {
      const errorText = await paymentResponse.text();
      console.error('❌ Error creando enlace:', paymentResponse.status, errorText);
      return NextResponse.json(
        { error: `Error creando enlace: ${paymentResponse.status}` },
        { status: paymentResponse.status }
      );
    }

    const linkData = await paymentResponse.json();
    console.log('✅ Enlace de pago creado exitosamente:', linkData);

    return NextResponse.json({
      success: true,
      payment_url: linkData.permalink || linkData.payment_url,
      transaction_id: linkData.id
    });

  } catch (error) {
    console.error('❌ Error en creación de enlace:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error desconocido' },
      { status: 500 }
    );
  }
}
