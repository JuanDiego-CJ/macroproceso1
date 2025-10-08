import { Template } from '@/contexts/ConfiguratorContext';

export const templates: Template[] = [
  {
    id: 'dental-clinic',
    name: 'Clínica Dental',
    description: 'Gestión completa para consultorios odontológicos',
    icon: '🦷',
    monthlyPrice: 299,
    initialPrice: 1500,
  },
  {
    id: 'online-store',
    name: 'Tienda Online',
    description: 'E-commerce completo con carrito y pagos',
    icon: '🛍️',
    monthlyPrice: 399,
    initialPrice: 2000,
  },
  {
    id: 'consulting',
    name: 'Consultora',
    description: 'Portal profesional para servicios de consultoría',
    icon: '💼',
    monthlyPrice: 249,
    initialPrice: 1200,
  },
  {
    id: 'restaurant',
    name: 'Restaurante',
    description: 'Menú digital, reservas y pedidos online',
    icon: '🍽️',
    monthlyPrice: 349,
    initialPrice: 1800,
  },
  {
    id: 'gym',
    name: 'Gimnasio',
    description: 'Gestión de miembros, clases y rutinas',
    icon: '💪',
    monthlyPrice: 329,
    initialPrice: 1600,
  },
  {
    id: 'real-estate',
    name: 'Inmobiliaria',
    description: 'Catálogo de propiedades y gestión de clientes',
    icon: '🏠',
    monthlyPrice: 379,
    initialPrice: 1900,
  },
];
