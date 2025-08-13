import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const dominio = searchParams.get('dominio');
    
    // Por ahora, retornamos categorías hardcodeadas para que funcione
    // Después las conectaremos a la base de datos real
    const categorias = [
      "canastas-vino",
      "canastas-whisky", 
      "canastas-sin-licor",
      "flores"
    ];
    
    return NextResponse.json(categorias);
  } catch (error) {
    console.error('Error en API categorías:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
