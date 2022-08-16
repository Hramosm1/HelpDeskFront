import { Injectable } from '@angular/core';
import { HttpService } from 'app/backend/services/http.service';
import { TablaTicket, Ticket, TicketResult } from 'app/modules/mantenimientos/interfaces';
import { map, mergeMap, Observable, tap } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private _user: UserService, private api: HttpService) { }
  private calcularBlancoONegroSegunColor(color: string) {
    const col: string = color.replace('#', '');
    const r: number = parseInt(col.slice(0, 2), 16);
    const g: number = parseInt(col.slice(2, 4), 16);
    const b: number = parseInt(col.slice(4, 6), 16);
    return ((r + g + b) / 3 < (255 / 2) ? 'text-white' : 'text-gray-800');
  }
  getTickets(take: number, page: number, query?: any): Observable<TicketResult> {
    const tickets$ = this._user.user$
      .pipe(mergeMap((us) => {
        const pe = us.permisosEspeciales.reduce<string[]>((cur, val) => ([...cur, val.nombre.toLowerCase()]), []);
        if (pe.includes('ver tickets de otros')) {
          return this.api
            .getTickets(take, page, query)
            .pipe(map(this.getTextColor));
        }
        else {
          return this.api
            .getTickets(take, page, { ...query, solicitudDe: us.id })
            .pipe(map(this.getTextColor));
        }
      }));
    return tickets$;
  }

  getTextColor = (arr: TicketResult): { rows: TablaTicket[]; count: number } => {
    const rows = arr.rows.map(ticket => ({ ...ticket, colorTexto: this.calcularBlancoONegroSegunColor(ticket.Prioridades.color) }));
    return { rows, count: arr.count };
  };
}
