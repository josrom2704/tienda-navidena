import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoria = searchParams.get('categoria');
    const dominio = searchParams.get('dominio');
    
    // API temporal mientras arreglamos Render
    const productos = [
      {
        id: 1,
        nombre: "Canasta Premium con Vino",
        precio: 89.99,
        categoria: "canastas-vino",
        imagen: "/images/canasta-vino-1.jpg",
        descripcion: "Canasta elegante con vino tinto premium y chocolates"
      },
      {
        id: 2,
        nombre: "Canasta Whisky Selecto",
        precio: 129.99,
        categoria: "canastas-whisky",
        imagen: "/images/canasta-whisky-1.jpg",
        descripcion: "Canasta de lujo con whisky premium y snacks gourmet"
      },
      {
        id: 3,
        nombre: "Arreglo Floral Navideño",
        precio: 69.99,
        categoria: "flores",
        imagen: "/images/flores-1.jpg",
        descripcion: "Hermoso arreglo con flores de temporada"
      },
      {
        id: 4,
        nombre: "Canasta Sin Licor",
        precio: 59.99,
        categoria: "canastas-sin-licor",
        imagen: "/images/canasta-sin-licor-1.jpg",
        descripcion: "Canasta perfecta para toda la familia"
      }
    ];
    
    // Filtrar por categoría si se especifica
    if (categoria) {
      const productosFiltrados = productos.filter(p => p.categoria === categoria);
      return NextResponse.json(productosFiltrados);
    }
    
    return NextResponse.json(productos);
  } catch (error) {
    console.error('Error en API productos:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
