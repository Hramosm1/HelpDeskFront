export interface createResponse {
  output: object
  recordsets: any[]
  rowsAffected: number[]
}
export interface updateResponse {
  output: object
  recordsets: any[]
  rowsAffected: number[]
}
export interface deleteResponse {
  output: object
  recordsets: any[]
  rowsAffected: number[]
}
export interface Ticket {
  id: number;
  titulo: string;
  descripcion: string;
  fechaSolicitud: Date;
  asignadoA?: string;
  solicitudDe: string;
  prioridad: string;
  colorPrioridad: string;
  estado: string;
  idPrioridad: number;
  idEstado: number;
  idAsignado?: number;
  idSolicitante: string;
  activo: boolean;
}