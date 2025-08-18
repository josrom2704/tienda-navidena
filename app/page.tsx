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
            console.log("🧪 TEST DIRECTO - API CATEGORÍAS");
            
            try {
              // Test 1: Sin parámetros
              console.log("🧪 Test 1: Sin parámetros");
              const res1 = await fetch("https://flores-backend-px2c.onrender.com/api/categorias");
              const data1 = await res1.json();
              console.log("✅ Respuesta sin parámetros:", data1);
              
              // Test 2: Con dominio
              console.log("🧪 Test 2: Con dominio tiendanavidena.vercel.app");
              const res2 = await fetch("https://flores-backend-px2c.onrender.com/api/categorias?dominio=tiendanavidena.vercel.app");
              const data2 = await res2.json();
              console.log("✅ Respuesta con dominio:", data2);
              
              // Test 3: Con URL
              console.log("🧪 Test 3: Con URL tiendanavidena.vercel.app");
              const res3 = await fetch("https://flores-backend-px2c.onrender.com/api/categorias?url=tiendanavidena.vercel.app");
              const data3 = await res3.json();
              console.log("✅ Respuesta con URL:", data3);
              
              // Test 4: Todas las floristerías
              console.log("🧪 Test 4: Todas las floristerías");
              const res4 = await fetch("https://flores-backend-px2c.onrender.com/api/floristerias");
              const data4 = await res4.json();
              console.log("✅ Todas las floristerías:", data4);
              
            } catch (error) {
              console.error("❌ Error en test directo:", error);
            }
          }}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors"
        >
          🧪 Test Categorías
        </button>
      </div>
    </main>
  );
}
