import { Module } from '@/contexts/ConfiguratorContext';

export const modules: Module[] = [
  {
    id: 'appointments',
    name: 'Agendamiento de Citas',
    description: 'Sistema completo de reservas con confirmaciones automáticas',
    monthlyPrice: 49,
    initialPrice: 300,
  },
  {
    id: 'whatsapp-payments',
    name: 'Pagos por WhatsApp',
    description: 'Integración de pagos directamente en WhatsApp Business',
    monthlyPrice: 79,
    initialPrice: 500,
  },
  {
    id: 'sentiment-analysis',
    name: 'Análisis de Sentimiento',
    description: 'IA para analizar comentarios y opiniones de clientes',
    monthlyPrice: 99,
    initialPrice: 600,
  },
  {
    id: 'crm',
    name: 'CRM Integrado',
    description: 'Gestión de relaciones con clientes y seguimiento',
    monthlyPrice: 89,
    initialPrice: 550,
  },
  {
    id: 'email-marketing',
    name: 'Email Marketing',
    description: 'Campañas automatizadas y newsletters',
    monthlyPrice: 59,
    initialPrice: 350,
  },
  {
    id: 'analytics',
    name: 'Analytics Avanzado',
    description: 'Reportes detallados y métricas en tiempo real',
    monthlyPrice: 69,
    initialPrice: 400,
  },
  {
    id: 'inventory',
    name: 'Control de Inventario',
    description: 'Gestión de stock y alertas de reabastecimiento',
    monthlyPrice: 79,
    initialPrice: 450,
  },
  {
    id: 'loyalty-program',
    name: 'Programa de Lealtad',
    description: 'Sistema de puntos y recompensas para clientes',
    monthlyPrice: 89,
    initialPrice: 500,
  },
];
