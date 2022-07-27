export interface User {
    id: string;
    usuario: string;
    nombre: string;
    idPersonaUnica?: string;
    correo?: string;
    status?: string;
    avatar?: string;
    permisos: Permiso[];
    permisosEspeciales: PermisosEspecial[];
}
export interface Permiso {
    id: number;
    ver: boolean;
    crear: boolean;
    editar: boolean;
    eliminar: boolean;
    idModulo: number;
    idRol: number;
    activo: boolean;
    modulo: string;
    rol: string;
}

export interface PermisosEspecial {
    id: number;
    nombre: string;
    activo: boolean;
}

export interface AuthResult {
    accessToken: string;
    user: User;
}

