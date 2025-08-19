export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('🔗 Creando enlace de pago en Wompi...');
    
    const { amount_in_cents, currency, reference, customer_email, expires_at } = req.body;

    // Primero obtener el token de acceso
    const authResponse = await fetch('https://id.wompi.sv/connect/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: '670b06ca-2e3b-4818-a07a-18c22055e3a1',
        client_secret: '9eac51bc-f0ca-4f26-823b-9656e3b618d5',
        audience: 'wompi_api'
      })
    });

    if (!authResponse.ok) {
      const errorText = await authResponse.text();
      console.error('❌ Error de autenticación:', authResponse.status, errorText);
      return res.status(authResponse.status).json({
        error: `Error de autenticación: ${authResponse.status}`,
        details: errorText
      });
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
      return res.status(paymentResponse.status).json({
        error: `Error creando enlace: ${paymentResponse.status}`,
        details: errorText
      });
    }

    const linkData = await paymentResponse.json();
    console.log('✅ Enlace de pago creado exitosamente:', linkData);

    return res.status(200).json({
      success: true,
      payment_url: linkData.permalink || linkData.payment_url,
      transaction_id: linkData.id
    });

  } catch (error) {
    console.error('❌ Error en creación de enlace:', error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
}
