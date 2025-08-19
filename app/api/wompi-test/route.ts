import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('🧪 Probando conexión con Wompi...');
    
    // Probar solo la autenticación
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
      console.error('❌ Error de autenticación Wompi:', authResponse.status, errorText);
      return NextResponse.json({
        success: false,
        error: `Error de autenticación: ${authResponse.status}`,
        details: errorText
      }, { status: authResponse.status });
    }

    const authData = await authResponse.json();
    console.log('✅ Autenticación Wompi exitosa');

    return NextResponse.json({
      success: true,
      message: 'Conexión con Wompi funcionando correctamente',
      token_type: authData.token_type,
      expires_in: authData.expires_in
    });

  } catch (error) {
    console.error('❌ Error en prueba de Wompi:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
}
