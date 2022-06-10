import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'app/backend/services/http.service';
import { UserService } from 'app/core/user/user.service';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators'
import { CerrarTicketComponent } from '../cerrar-ticket/cerrar-ticket.component';
@Component({
  selector: 'app-ticket-information',
  templateUrl: './ticket-information.component.html',
  styleUrls: ['./ticket-information.component.scss']
})
export class TicketInformationComponent implements OnInit {
  id$: Observable<string>
  ticket$: Observable<any>
  permisosEspeciales$ = this.user.permisosEspecialesStr$
  @ViewChild('descripcion') descripcion: ElementRef
  constructor(private ar: ActivatedRoute, private api: HttpService, private user: UserService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.id$ = this.ar.params.pipe(pluck('id'))
    this.id$.subscribe(val => this.ticket$ = this.api.getById('tickets', val))
  }
  cerrarTicket() {
    this.dialog.open(CerrarTicketComponent, { width: '80vw', disableClose: true, data: this.ticket$ })
  }

}
