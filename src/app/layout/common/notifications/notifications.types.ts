export interface Notification {
    id: string;
    icono?: string;
    titulo: string;
    descripcion: string;
    fecha: string;
    visto: boolean;
    link?: string;
    redirecciona: boolean;
}

export interface old {
    id: string;
    icon?: string;
    image?: string;
    title?: string;
    description?: string;
    time: string;
    link?: string;
    useRouter?: boolean;
    read: boolean;
}
