export interface Estado {
  id: number;
  nombre: string;
  activo?: boolean
}
export interface Categoria {
}
export interface SubCategoria {
}
export interface Prioridad {
  id: number;
  nombre: string;
  color: string;
  activo?: boolean;
}