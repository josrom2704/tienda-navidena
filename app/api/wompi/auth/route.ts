import { NextResponse } from 'next/server';

export async function POST() {
  try {
    console.log('🔐 Iniciando autenticación con Wompi...');
    
    const response = await fetch('https://id.wompi.sv/connect/token', {
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

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error de Wompi:', response.status, errorText);
      return NextResponse.json(
        { error: `Error de Wompi: ${response.status}` },
        { status: response.status }
      );
    }

    const tokenData = await response.json();
    console.log('✅ Token de Wompi obtenido exitosamente');
    
    return NextResponse.json(tokenData);
    
  } catch (error) {
    console.error('❌ Error en autenticación:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error desconocido' },
      { status: 500 }
    );
  }
}
