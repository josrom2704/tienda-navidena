"use client";

import { HeroBanner } from "@/components/hero-banner";
import { FeaturesSection } from "@/components/features-section";
import { DailySelection } from "@/components/daily-selection";
import { CategoriesGrid } from "@/components/categories-grid";
import { CustomQuoteSection } from "@/components/custom-quote-section";
import { DebugPanel } from "@/components/debug-panel";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroBanner />
      <FeaturesSection />
      <DailySelection />
      <CustomQuoteSection />
      <DebugPanel />
      
      {/* Botón de debug temporal para categorías */}
      <div className="fixed bottom-4 left-4 z-50">
        <button
          onClick={async () => {
            console.log("�� TEST DIRECTO - API COMPLETA");
            
            try {
              // Test 1: Categorías sin parámetros
              console.log("🧪 Test 1: Categorías sin parámetros");
              const res1 = await fetch("https://flores-backend-px2c.onrender.com/api/categorias");
              const data1 = await res1.json();
              console.log("✅ Respuesta sin parámetros:", data1);
              
              // Test 2: Categorías con URL
              console.log("🧪 Test 2: Categorías con URL tiendanavidena.vercel.app");
              const res2 = await fetch("https://flores-backend-px2c.onrender.com/api/categorias?url=tiendanavidena.vercel.app");
              const data2 = await res2.json();
              console.log("✅ Respuesta con URL:", data2);
              
              // Test 3: Productos sin parámetros
              console.log("🧪 Test 3: Productos sin parámetros");
              const res3 = await fetch("https://flores-backend-px2c.onrender.com/api/flores");
              const data3 = await res3.json();
              console.log("✅ Productos sin parámetros:", data3);
              console.log("📊 Cantidad de productos:", Array.isArray(data3) ? data3.length : 'No es array');
              
              // Test 4: Productos con URL
              console.log("🧪 Test 4: Productos con URL tiendanavidena.vercel.app");
              const res4 = await fetch("https://flores-backend-px2c.onrender.com/api/flores?url=tiendanavidena.vercel.app");
              const data4 = await res4.json();
              console.log("✅ Productos con URL:", data4);
              console.log("📊 Cantidad de productos:", Array.isArray(data4) ? data4.length : 'No es array');
              
              // Test 5: Productos por categoría específica
              console.log("🧪 Test 5: Productos por categoría 'Canastas con vino'");
              const res5 = await fetch("https://flores-backend-px2c.onrender.com/api/flores?url=tiendanavidena.vercel.app&categoria=Canastas con vino");
              const data5 = await res5.json();
              console.log("✅ Productos por categoría:", data5);
              console.log("📊 Cantidad de productos:", Array.isArray(data5) ? data5.length : 'No es array');
              
              // Test 6: Ver estructura de productos existentes
              console.log("🧪 Test 6: Estructura de productos existentes");
              if (Array.isArray(data3) && data3.length > 0) {
                const primerProducto = data3[0];
                console.log("📋 Primer producto:", primerProducto);
                console.log("🔍 Campos del producto:", Object.keys(primerProducto));
                console.log("🏪 Campo floristeria:", primerProducto.floristeria);
                console.log("📂 Campo categoria:", primerProducto.categoria);
              }
              
              // Test 7: Probar con diferentes URLs
              console.log("🧪 Test 7: Probar con diferentes URLs");
              const urls = ['tiendanavidena.vercel.app', 'tiendanavidena', 'localhost', 'vercel.app'];
              
              for (const testUrl of urls) {
                try {
                  const res = await fetch(`https://flores-backend-px2c.onrender.com/api/flores?url=${encodeURIComponent(testUrl)}`);
                  const data = await res.json();
                  console.log(`🔍 URL '${testUrl}':`, Array.isArray(data) ? data.length : 'No es array', 'productos');
                } catch (error) {
                  console.log(`❌ URL '${testUrl}': Error`, error instanceof Error ? error.message : 'Error desconocido');
                }
              }
              
            } catch (error) {
              console.error("❌ Error en test directo:", error);
            }
          }}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors"
        >
          🧪 Test Completo
        </button>
      </div>
    </main>
  );
}
