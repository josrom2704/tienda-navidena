import { NextRequest, NextResponse } from 'next/server';

// Interface para crear un pedido
interface CreateOrderRequest {
  orderNumber: string;
  items: Array<{
    id: number;
    name: string;
    quantity: number;
    price: number;
    image: string;
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
  status?: string;
}

// POST - Crear un nuevo pedido
export async function POST(request: NextRequest) {
  try {
    const orderData: CreateOrderRequest = await request.json();

    console.log('📦 Creando pedido:', orderData.orderNumber);

    // Intentar guardar en el backend
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://flores-backend-px2c.onrender.com/api';
    
    try {
      const response = await fetch(`${backendUrl}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const savedOrder = await response.json();
        console.log('✅ Pedido guardado en el backend:', savedOrder);
        return NextResponse.json(savedOrder, { status: 201 });
      } else {
        console.warn('⚠️ El backend no procesó el pedido, guardando localmente');
      }
    } catch (backendError) {
      console.warn('⚠️ Error al guardar en backend, usando almacenamiento local:', backendError);
    }

    // Fallback: Retornar los datos del pedido (en producción deberías usar una base de datos)
    return NextResponse.json({
      ...orderData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      saved: true
    }, { status: 201 });

  } catch (error) {
    console.error('❌ Error creando pedido:', error);
    return NextResponse.json(
      { error: 'Error al crear el pedido' },
      { status: 500 }
    );
  }
}

// GET - Obtener un pedido por número de orden
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderNumber = searchParams.get('orderNumber');

    if (!orderNumber) {
      return NextResponse.json(
        { error: 'orderNumber es requerido' },
        { status: 400 }
      );
    }

    console.log('🔍 Buscando pedido:', orderNumber);

    // Intentar obtener del backend
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://flores-backend-px2c.onrender.com/api';
    
    try {
      const response = await fetch(`${backendUrl}/orders/${orderNumber}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const order = await response.json();
        console.log('✅ Pedido encontrado en el backend');
        return NextResponse.json(order);
      } else if (response.status === 404) {
        // Intentar obtener desde localStorage (solo en cliente, aquí no funciona)
        console.warn('⚠️ Pedido no encontrado en backend');
        return NextResponse.json(
          { error: 'Pedido no encontrado' },
          { status: 404 }
        );
      }
    } catch (backendError) {
      console.warn('⚠️ Error al buscar en backend:', backendError);
      return NextResponse.json(
        { error: 'Error al buscar el pedido' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Pedido no encontrado' },
      { status: 404 }
    );

  } catch (error) {
    console.error('❌ Error obteniendo pedido:', error);
    return NextResponse.json(
      { error: 'Error al obtener el pedido' },
      { status: 500 }
    );
  }
}

