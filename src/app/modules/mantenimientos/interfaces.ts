export interface BasicInterface { id: string; nombre: string }
export type Solicitud = BasicInterface;
export type Categoria = BasicInterface;
export interface Estado extends BasicInterface { activo?: boolean }
export interface SubCategoria extends BasicInterface {
  idCategoria: number;
  categoria: string;
  activo?: boolean;
}
export interface Prioridad extends BasicInterface {
  color: string;
  activo?: boolean;
}
export interface TablaTicket extends Ticket { colorTexto: string }
export interface Estados { nombre: string }
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
  idCobrador?: number;
  fechaCreacion?: Date;
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
  rows: Ticket[];
  count: number;
}
export interface Prioridades {
  nombre: string;
  color: string;
}

export interface NotificacionesPorRol {
  id: number;
  idRol: number;
  rol: string;
  idTipoNotificacion: number;
  tipoNotificacion: string;
  activo: boolean;
}