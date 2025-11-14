import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// import { Checkbox } from '@/components/ui/checkbox'; // No se usa en el componente
import { useNavigate } from 'react-router-dom';
import { useConfigurator } from '@/contexts/ConfiguratorContext';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff } from 'lucide-react';
// ELIMINAMOS: import { mockUsers } from '@/data/userSimulator'; 

const SignIn = () => { 
  const navigate = useNavigate();
  
  const { 
    state, 
    loginUser, 
    isAuthenticated
  } = useConfigurator();

  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  // 1. Guardián inicial: Si ya está logueado, vamos al paso 2
  useEffect(() => {
    if (isAuthenticated()) {
        navigate('/configurar/paso-2'); 
    }
  }, [isAuthenticated, navigate]);

  // Si no ha seleccionado plantilla, lo mandamos al paso 1
  if (!state.selectedTemplate && !isAuthenticated()) {
    navigate('/configurar/paso-1');
    return null;
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Email inválido o requerido';
    }
    if (!password) {
      newErrors.password = 'La contraseña es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 2. Lógica de SUBMIT: Usamos loginUser (Ahora llama a n8n)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) {
      toast({
        title: 'Error en el formulario',
        description: 'Por favor, completa los campos requeridos.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    // 🚀 Ejecuta la función del contexto, que ahora hace el fetch a n8n
    const loginSuccessful = await loginUser(email, password);

    setIsLoading(false);

    if (loginSuccessful) {
        toast({
            title: 'Inicio de Sesión Exitoso',
            description: 'Redirigiendo a tu configuración...',
        });
        
        setTimeout(() => {
            navigate('/configurar/paso-2'); 
        }, 500);

    } else {
        setErrors({ general: 'Credenciales incorrectas. Intenta de nuevo.' });
        toast({
            title: 'Fallo al iniciar sesión',
            // CORRECCIÓN: Mensaje genérico, eliminamos la referencia a mockUsers
            description: 'Verifica tu email y contraseña e inténtalo de nuevo.',
            variant: 'destructive',
        });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Inicia Sesión</h1>
          <p className="text-muted-foreground">
            Continúa donde lo dejaste o accede a tu historial.
          </p>
        </div>
        
        {errors.general && <p className="text-sm text-destructive text-center mb-4">{errors.general}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className={errors.email ? 'border-destructive' : ''}
            />
            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Mínimo 8 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className={errors.password ? 'border-destructive' : ''}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
          </div>

          <Button 
              type="submit" 
              variant="gradient" 
              size="lg" 
              className="w-full"
              disabled={isLoading}
            >
            {isLoading ? 'Verificando...' : 'Iniciar Sesión'}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            ¿No tienes cuenta?{' '}
            <button type='button' className="text-primary hover:underline" onClick={()=>navigate('/crear-cuenta')}>
              Regístrate aquí
            </button>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default SignIn;