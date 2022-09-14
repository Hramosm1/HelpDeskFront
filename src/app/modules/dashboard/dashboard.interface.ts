
interface Values {
  ticketsActivos: number;
  ticketsCerrados: number;
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
  tiempoPromedio: number;
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
