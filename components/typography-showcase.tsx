import React from 'react';

export function TypographyShowcase() {
  return (
    <div className="min-h-screen bg-cream-50 py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl title-elegant text-elegant-black mb-4">
            Guía de Tipografías y Estilos
          </h1>
          <p className="text-lg text-elegant-gray font-medium">
            Nuevo esquema de colores blanco-negro-dorado con tipografías elegantes
          </p>
        </div>

        {/* Tipografías */}
        <div className="space-y-12">
          <section className="bg-elegant-white p-8 rounded-2xl shadow-elegant border border-gold-200">
            <h2 className="text-2xl title-elegant text-elegant-black mb-6">Tipografías Disponibles</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-elegant-gray mb-2">Cormorant Garamond (Elegante)</h3>
                <div className="space-y-2">
                  <p className="text-4xl title-elegant text-elegant-black">Título Principal</p>
                  <p className="text-2xl title-elegant text-gold-500">Subtítulo Dorado</p>
                  <p className="text-lg title-elegant text-elegant-gray">Texto de cuerpo elegante</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-elegant-gray mb-2">Libre Baskerville (Clásica)</h3>
                <div className="space-y-2">
                  <p className="text-4xl title-classic text-elegant-black">Título Clásico</p>
                  <p className="text-2xl title-classic text-gold-500">Subtítulo Clásico</p>
                  <p className="text-lg title-classic text-elegant-gray">Texto de cuerpo clásico</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-elegant-gray mb-2">Playfair Display (Moderno)</h3>
                <div className="space-y-2">
                  <p className="text-4xl title-playfair text-elegant-black">Título Moderno</p>
                  <p className="text-2xl title-playfair text-gold-500">Subtítulo Moderno</p>
                  <p className="text-lg title-playfair text-elegant-gray">Texto de cuerpo moderno</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-elegant-gray mb-2">Inter (Sans-serif)</h3>
                <div className="space-y-2">
                  <p className="text-4xl font-sans text-elegant-black">Título Sans-serif</p>
                  <p className="text-2xl font-sans text-gold-500">Subtítulo Sans-serif</p>
                  <p className="text-lg font-sans text-elegant-gray">Texto de cuerpo sans-serif</p>
                </div>
              </div>
            </div>
          </section>

          {/* Colores */}
          <section className="bg-elegant-white p-8 rounded-2xl shadow-elegant border border-gold-200">
            <h2 className="text-2xl title-elegant text-elegant-black mb-6">Paleta de Colores</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-elegant-gray mb-4">Colores Principales</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-elegant-black rounded"></div>
                    <span className="text-elegant-black font-medium">elegant-black</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-elegant-white rounded border border-gold-200"></div>
                    <span className="text-elegant-black font-medium">elegant-white</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-elegant-light rounded"></div>
                    <span className="text-elegant-black font-medium">elegant-light</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-elegant-gray rounded"></div>
                    <span className="text-elegant-white font-medium">elegant-gray</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-elegant-gray mb-4">Colores Dorados</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gold-400 rounded"></div>
                    <span className="text-elegant-black font-medium">gold-400</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gold-500 rounded"></div>
                    <span className="text-elegant-white font-medium">gold-500</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gold-600 rounded"></div>
                    <span className="text-elegant-white font-medium">gold-600</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Botones */}
          <section className="bg-elegant-white p-8 rounded-2xl shadow-elegant border border-gold-200">
            <h2 className="text-2xl title-elegant text-elegant-black mb-6">Estilos de Botones</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-elegant-gray mb-4">Botones Principales</h3>
                <div className="flex flex-wrap gap-4">
                  <button className="gold-button px-6 py-3 rounded-lg">
                    Botón Dorado
                  </button>
                  <button className="elegant-button px-6 py-3 rounded-lg">
                    Botón Elegante
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-elegant-gray mb-4">Botones Secundarios</h3>
                <div className="flex flex-wrap gap-4">
                  <button className="bg-elegant-light text-elegant-black px-6 py-3 rounded-lg border border-gold-200 hover:bg-cream-100 transition-colors">
                    Botón Secundario
                  </button>
                  <button className="bg-cream-100 text-elegant-black px-6 py-3 rounded-lg border border-gold-300 hover:bg-cream-200 transition-colors">
                    Botón Crema
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Tarjetas */}
          <section className="bg-elegant-white p-8 rounded-2xl shadow-elegant border border-gold-200">
            <h2 className="text-2xl title-elegant text-elegant-black mb-6">Estilos de Tarjetas</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="elegant-card p-6 rounded-xl">
                <h3 className="text-xl title-elegant text-elegant-black mb-3">Tarjeta Elegante</h3>
                <p className="text-elegant-gray">Esta es una tarjeta con el estilo elegante-card que incluye sombras y bordes dorados.</p>
              </div>

              <div className="category-card p-6 rounded-xl">
                <h3 className="text-xl title-elegant text-elegant-black mb-3">Tarjeta de Categoría</h3>
                <p className="text-elegant-gray">Esta es una tarjeta con el estilo category-card que incluye gradientes crema.</p>
              </div>
            </div>
          </section>

          {/* Gradientes */}
          <section className="bg-elegant-white p-8 rounded-2xl shadow-elegant border border-gold-200">
            <h2 className="text-2xl title-elegant text-elegant-black mb-6">Gradientes Disponibles</h2>
            
            <div className="space-y-4">
              <div className="elegant-gradient p-6 rounded-lg">
                <h3 className="text-lg font-medium text-elegant-black">Gradiente Elegante</h3>
                <p className="text-elegant-gray">De blanco a gris muy claro</p>
              </div>
              
              <div className="gold-gradient p-6 rounded-lg">
                <h3 className="text-lg font-medium text-elegant-white">Gradiente Dorado</h3>
                <p className="text-elegant-white">De dorado claro a dorado oscuro</p>
              </div>
              
              <div className="cream-gradient p-6 rounded-lg">
                <h3 className="text-lg font-medium text-elegant-black">Gradiente Crema</h3>
                <p className="text-elegant-gray">De blanco a crema muy claro</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
