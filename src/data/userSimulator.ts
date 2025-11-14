// @/data/userSimulator.ts

// 1. Interfaces y Mock de Usuarios
interface MockUser {
    username: string; // Usado como email
    passwordHash: string; 
    isRecurring: boolean;
    lastTemplateId: string | null;
}

export const mockUsers: MockUser[] = [
    {
        username: "charizardxd100@gmail.com",
        passwordHash: "LYnXyrjmkV5CqSN", 
        isRecurring: true,
        lastTemplateId: "dental-clinic" // ID de plantilla usado en el historial
    },
    {
        username: "nuevo.usuario@ejemplo.com",
        passwordHash: "pass123", 
        isRecurring: false,
        lastTemplateId: null 
    },
];

export const findUser = (username: string, passwordHash: string): MockUser | null => {
    const user = mockUsers.find(
        (u) => u.username === username && u.passwordHash === passwordHash
    );
    return user || null;
};

// 2. Interfaces y Mock de Plantillas (Necesario para el Helper)
interface MockTemplate {
    id: string;
    name: string;
}

const mockTemplates: MockTemplate[] = [
    { id: "dental-clinic", name: "Clínica Dental Pro" },
    { id: "e-commerce-basic", name: "E-commerce Básico" },
    { id: "corporate-site", name: "Sitio Corporativo" },
    // AÑADE AQUÍ TODOS LOS IDs de tus plantillas reales
];

// 3. FUNCIÓN REQUERIDA (getTemplateNameById)
/**
 * Busca el nombre de una plantilla dado su ID.
 */
export const getTemplateNameById = (templateId: string): string => {
    const template = mockTemplates.find(t => t.id === templateId);
    return template ? template.name : 'Plantilla Desconocida';
};