import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Zap, ShieldCheck, Sparkles } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen gradient-subtle">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Configuración inteligente con precio dinámico
            </span>
          </div>
          
          <h1 className="mb-6 max-w-4xl mx-auto">
            Configura tu solución digital en{' '}
            <span className="gradient-primary bg-clip-text text-transparent">
              3 simples pasos
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Plataformas personalizadas para tu negocio. Sin código, sin sorpresas en el precio.
            Solo lo que necesitas.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              variant="gradient"
              size="lg"
              onClick={() => navigate('/configurar/paso-1')}
              className="shadow-xl text-base"
            >
              Empezar configuración
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/articulo')}
              className="text-base"
            >
              Ver cómo funciona
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-background/80 backdrop-blur rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">Configuración Rápida</h3>
              <p className="text-sm text-muted-foreground">
                Selecciona plantilla, agrega módulos y listo. Todo en minutos.
              </p>
            </div>

            <div className="bg-background/80 backdrop-blur rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">Precio Transparente</h3>
              <p className="text-sm text-muted-foreground">
                Ve el costo en tiempo real. Sin tarifas ocultas ni sorpresas.
              </p>
            </div>

            <div className="bg-background/80 backdrop-blur rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">100% Personalizable</h3>
              <p className="text-sm text-muted-foreground">
                Elige solo los módulos que necesitas para tu negocio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Listo para empezar?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Miles de empresas ya configuraron su solución perfecta
          </p>
          <Button
            variant="gradient"
            size="lg"
            onClick={() => navigate('/campana')}
            className="shadow-xl"
          >
            Ver más información
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="font-semibold mb-1">Tu Solución Digital</p>
              <p className="text-sm text-muted-foreground">
                Configuración inteligente para tu negocio
              </p>
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
                Privacidad
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
                Términos
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
                Soporte
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
