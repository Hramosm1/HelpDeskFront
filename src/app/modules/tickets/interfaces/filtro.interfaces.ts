import { MatDateFormats } from "@angular/material/core"
import { } from "luxon";

export interface Filtro {
  id?: number
  titulo?: string,
  solicitudDe?: string,
  idEstado?: number,
  idPrioridad?: number,
  desde?: Date,
  hasta?: Date,
  asignadoA?: string,
  activo?: boolean
}
export const DATA_CONFIG: MatDateFormats = {
  parse: {
    dateInput: 'dd/MM/yyyy',
  },
  display: {
    dateInput: 'dd/MM/yyyy',
    monthYearLabel: 'MMM-yy',
    dateA11yLabel: 'MMMM',
    monthYearA11yLabel: 'MMMM yyyy',
  },
}