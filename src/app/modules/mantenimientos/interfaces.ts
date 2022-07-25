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
export interface Ticket {
  id: number;
  titulo: string;
  solicitudDe: Solicitud;
  asignadoA: number;
  fechaSolicitud: Date;
  activo: boolean;
  Prioridades: Prioridades;
  Estados: Estados;
}
export interface TicketResult {
  rows: Ticket[],
  count: number
}
export interface TablaTicket extends Ticket {
  colorTexto: string
}
export interface Prioridades {
  nombre: string;
  color: string;
}
export interface Solicitud {
  id: string
  nombre: string
}

export interface Estados {
  nombre: string;
}
