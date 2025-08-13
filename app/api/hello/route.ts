import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    message: 'API funcionando correctamente en Vercel!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
}
