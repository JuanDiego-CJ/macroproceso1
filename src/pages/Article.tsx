import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calendar, Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Article = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <article className="lg:col-span-2">
            <div className="mb-6">
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  15 de Octubre, 2025
                </span>
                <span className="flex items-center gap-1">
                  <Tag className="w-4 h-4" />
                  Transformación Digital
                </span>
              </div>
              <h1 className="mb-6">
                Cómo Configurar tu Solución Digital en Minutos: La Guía Definitiva
              </h1>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground mb-6">
                En la era digital, configurar una solución tecnológica personalizada ya no requiere
                semanas de trabajo. Descubre cómo puedes tener tu plataforma lista en solo 3 pasos.
              </p>

              <div className="aspect-video bg-secondary rounded-lg mb-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <svg
                      className="w-10 h-10 text-primary"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Video: Configurador en acción (3:45)
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-4">El Desafío de la Personalización</h2>
              <p className="mb-4">
                Cada negocio es único, y por eso necesita soluciones que se adapten a sus necesidades
                específicas. El problema tradicional ha sido que la personalización requiere tiempo,
                recursos técnicos y presupuestos elevados.
              </p>

              <h2 className="text-2xl font-bold mb-4">Una Nueva Forma de Configurar</h2>
              <p className="mb-4">
                Nuestro configurador inteligente te permite seleccionar exactamente lo que necesitas:
              </p>

              <h3 className="text-xl font-semibold mb-3">1. Selecciona tu Plantilla Base</h3>
              <p className="mb-4">
                Elige entre plantillas optimizadas para diferentes industrias: clínicas dentales,
                tiendas online, consultoras, restaurantes, gimnasios e inmobiliarias.
              </p>

              <h3 className="text-xl font-semibold mb-3">2. Agrega Módulos Especializados</h3>
              <p className="mb-4">
                Personaliza tu solución con módulos como agendamiento de citas, pagos por WhatsApp,
                análisis de sentimiento con IA, CRM integrado y más.
              </p>

              <h3 className="text-xl font-semibold mb-3">3. Ve el Precio en Tiempo Real</h3>
              <p className="mb-4">
                Sin sorpresas. El configurador calcula automáticamente el costo inicial y la
                suscripción mensual basándose en tu selección.
              </p>

              <h2 className="text-2xl font-bold mb-4">Casos de Éxito</h2>
              <p className="mb-4">
                Más de 500 negocios ya han configurado sus soluciones con nuestra plataforma,
                reduciendo el tiempo de implementación en un 80% y los costos en un 60%.
              </p>
            </div>
          </article>

          {/* Sidebar CTA */}
          <aside className="lg:col-span-1">
            <Card className="p-6 sticky top-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 gradient-primary rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Configura tu solución</h3>
                <p className="text-muted-foreground mb-6">
                  Crea tu plataforma personalizada en minutos. Sin código, sin complicaciones.
                </p>
                <Button
                  variant="gradient"
                  size="lg"
                  className="w-full mb-3"
                  onClick={() => navigate('/configurar/paso-1')}
                >
                  Configura tu solución ahora
                </Button>
                <p className="text-xs text-muted-foreground">
                  Precio dinámico según tus necesidades
                </p>
              </div>
            </Card>
          </aside>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-border text-center">
          <div className="flex justify-center gap-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
              Privacidad
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
              Términos de Servicio
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Article;
