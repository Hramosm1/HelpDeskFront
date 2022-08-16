
interface Values {
  ticketsActivos: number;
  ticketsCerrados: number;
}


interface PersonalDeSoporte extends Values {
  personalAsignado: string;
}

export interface TicketsInfo {
  ticketsActivos: number;
  ticketsCerrados: number;
  ticketsPorUsuario: {
    personalAsignado: string;
    activos: number;
    cerrados: number;
  };
}

export interface AverageTickets {
  personal: string;
  tiempoAbierto: number;
  ticket: string;
}
export interface TiempoPromedio {
  personal: string;
  promedio: string;
}
export interface TicketsPorDia {
  accion: string;
  dia: string;
  tickets: number;
}
