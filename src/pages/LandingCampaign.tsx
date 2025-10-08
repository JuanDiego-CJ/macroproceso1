import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Zap, Package, DollarSign } from 'lucide-react';

const LandingCampaign = () => {
  const navigate = useNavigate();

  const steps = [
    {
      icon: Package,
      title: 'Selecciona tu Plantilla',
      description: 'Elige la base perfecta para tu industria',
    },
    {
      icon: Zap,
      title: 'Agrega Módulos',
      description: 'Personaliza con funcionalidades específicas',
    },
    {
      icon: DollarSign,
      title: 'Precio Dinámico',
      description: 'Ve el costo en tiempo real mientras configuras',
    },
  ];

  const testimonials = [
    { logo: '🏥', text: 'Redujimos el tiempo de implementación en 80%' },
    { logo: '🛒', text: 'Nuestra tienda online en menos de 1 hora' },
    { logo: '💼', text: 'Precio justo según lo que realmente necesitamos' },
  ];

  return (
    <div className="min-h-screen gradient-subtle">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="mb-6">Configura tu solución en 3 pasos</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Crea tu plataforma digital personalizada con precio dinámico. Sin sorpresas, sin
            código, sin complicaciones.
          </p>
          <Button
            variant="gradient"
            size="lg"
            className="shadow-xl"
            onClick={() => navigate('/configurar/paso-1')}
          >
            Comenzar ahora
          </Button>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="p-8 text-center hover:shadow-lg transition-smooth">
                <div className="w-16 h-16 mx-auto mb-4 gradient-primary rounded-full flex items-center justify-center">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <div className="mb-2 text-sm font-semibold text-primary">Paso {index + 1}</div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Empresas que ya configuraron su solución
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((item, index) => (
              <Card key={index} className="p-6 text-center">
                <div className="text-4xl mb-3">{item.logo}</div>
                <p className="text-sm text-muted-foreground">{item.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center border-t border-border">
        <div className="flex justify-center gap-6 text-sm">
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
      </footer>
    </div>
  );
};

export default LandingCampaign;
