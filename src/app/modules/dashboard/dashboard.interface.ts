
interface Values {
  ticketsActivos: number;
  ticketsCerrados: number;
}


interface PersonalDeSoporte extends Values {
  personalAsignado: string
}

export interface TicketsInfo {
  ticketsCreados: number;
  ticketCerrados: number;
  personalDeSoporte: PersonalDeSoporte[];
}

export interface AverageTickets {
  personal: string
  tiempoAbierto: number
  ticket: string
}
export interface TiempoPromedio {
  personal: string,
  promedio: string
}
export interface TicketsPorDia {
  accion: string
  dia: string
  tickets: number
}