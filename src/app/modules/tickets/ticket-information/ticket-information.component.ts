import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Ticket } from 'app/backend/interfaces/http';
import { HttpService } from 'app/backend/services/http.service';
import { UserService } from 'app/core/user/user.service';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators'
import { AsignarSoporteComponent } from '../asignar-soporte/asignar-soporte.component';
import { CerrarTicketComponent } from '../cerrar-ticket/cerrar-ticket.component';
@Component({
  selector: 'app-ticket-information',
  templateUrl: './ticket-information.component.html',
  styleUrls: ['./ticket-information.component.scss']
})
export class TicketInformationComponent implements OnInit {
  id$: Observable<string>
  ticket$: Observable<Ticket>
  comentarios = []
  permisosEspeciales$ = this.user.permisosEspecialesStr$
  @ViewChild('descripcion') descripcion: ElementRef
  constructor(private ar: ActivatedRoute, private api: HttpService, private user: UserService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.id$ = this.ar.params.pipe(pluck('id'))
    this.id$.subscribe(val => {
      this.ticket$ = this.api.getById('tickets', val)

      this.api.getById<any[]>('comentarios', val).subscribe({ next: val => this.comentarios = val, error: _ => null })
    })
  }
  cerrarTicket() {
    this.dialog.open(CerrarTicketComponent, { width: '80vw', disableClose: true, data: this.ticket$ })
  }
  asignarSoporte() {
    this.dialog.open(AsignarSoporteComponent, { width: '80vw', disableClose: true, data: this.ticket$ })
      .afterClosed()
      .subscribe(_ => {
        this.id$.subscribe(val => this.ticket$ = this.api.getById('tickets', val))
      })
  }
}
