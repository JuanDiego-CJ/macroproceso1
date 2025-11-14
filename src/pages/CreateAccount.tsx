// @/pages/CreateAccount.tsx 

import { useState, useEffect } from 'react'; 
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router-dom';
import { useConfigurator } from '@/contexts/ConfiguratorContext';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff } from 'lucide-react';

const CreateAccount = () => {
    const navigate = useNavigate();
    // Usamos registerUser y isAuthenticated
    const { 
        state, 
        registerUser, 
        isAuthenticated 
    } = useConfigurator(); 

    const { toast } = useToast();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false); 

    // Guardián inicial: Si ya está logueado, vamos al paso 2
    useEffect(() => {
        if (isAuthenticated()) {
            // Si ya está autenticado, lo mandamos al checkout.
            navigate('/checkout', { replace: true }); 
        }
    }, [isAuthenticated, navigate]);

    if (!state.selectedTemplate && !isAuthenticated()) {
        navigate('/configurar/paso-1');
        return null;
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!name.trim()) {
            newErrors.name = 'El nombre es requerido';
        }

        if (!email.trim()) {
            newErrors.email = 'El email es requerido';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'Email inválido';
        }

        if (!password) {
            newErrors.password = 'La contraseña es requerida';
        } else if (password.length < 8) {
            newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
        }

        if (!acceptTerms) {
            newErrors.terms = 'Debes aceptar los términos de servicio';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // 🚀 Lógica de REGISTRO y LOGIN
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        
        if (!validateForm()) {
            toast({
                title: 'Error en el formulario',
                description: 'Por favor corrige los errores antes de continuar',
                variant: 'destructive',
            });
            return;
        }

        setIsLoading(true);

        // Llamamos a la función del contexto que usa el webhook de n8n
        const registerSuccessful = await registerUser(name, email, password); 

        setIsLoading(false);

        if (registerSuccessful) {
            // registerUser ya actualiza el estado (authenticatedUser, userEmail, userName)

            toast({
                title: 'Cuenta creada',
                description: 'Redirigiendo al checkout...',
            });

            setTimeout(() => {
                navigate('/checkout'); // Redirige al checkout
            }, 500);
        } else {
            setErrors({ general: 'Fallo en el registro. El email podría estar en uso o hubo un error de conexión.' });
            toast({
                title: 'Fallo en el Registro',
                description: 'Verifica tus datos e inténtalo de nuevo.',
                variant: 'destructive',
            });
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <Card className="max-w-md w-full p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">Crear Cuenta</h1>
                    <p className="text-muted-foreground">
                        Un paso más para finalizar tu configuración
                    </p>
                </div>
                
                {errors.general && <p className="text-sm text-destructive text-center mb-4">{errors.general}</p>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nombre completo</Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Juan Pérez"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={isLoading} 
                            className={errors.name ? 'border-destructive' : ''}
                        />
                        {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                    </div>

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
                                disabled={isLoading} 
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                        {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-start gap-3">
                            <Checkbox
                                id="terms"
                                checked={acceptTerms}
                                onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                                disabled={isLoading} 
                                className={errors.terms ? 'border-destructive' : ''}
                            />
                            <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                                Acepto los{' '}
                                <a href="#" className="text-primary hover:underline">
                                    Términos de Servicio
                                </a>{' '}
                                y el{' '}
                                <a href="#" className="text-primary hover:underline">
                                    Contrato de Prestación
                                </a>
                            </Label>
                        </div>
                        {errors.terms && <p className="text-sm text-destructive">{errors.terms}</p>}
                    </div>

                    <Button 
                        type="submit" 
                        variant="gradient" 
                        size="lg" 
                        className="w-full"
                        disabled={isLoading} 
                    >
                        {isLoading ? 'Creando cuenta...' : 'Crear cuenta y continuar al pago'}
                    </Button>

                    <p className="text-center text-sm text-muted-foreground">
                        ¿Ya tienes cuenta?{' '}
                        <button
                            type="button"
                            className="text-primary hover:underline"
                            onClick={() => navigate('/sign-in')}
                            disabled={isLoading} 
                        >
                            Iniciar sesión
                        </button>
                    </p>
                </form>
            </Card>
        </div>
    );
};

export default CreateAccount;