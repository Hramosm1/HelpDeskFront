export interface Estado {
  id: number;
  nombre: string;
  activo?: boolean
}
export interface Categoria {
  id: number;
  nombre: string;
}
export interface SubCategoria {
  id: number;
  nombre: string;
  idCategoria: number;
  categoria: string;
  activo?: boolean;
}
export interface Prioridad {
  id: number;
  nombre: string;
  color: string;
  activo?: boolean;
}
export interface DataDialog<T> {
  editar: boolean;
  row?: T;
}
export interface Usuario {
  id: string;
  nombre: string;
  usuario?: string;
  correo?: string;
  idPersonaUnica?: string;
  idCobrador?: number
  fechaCreacion?: Date
}