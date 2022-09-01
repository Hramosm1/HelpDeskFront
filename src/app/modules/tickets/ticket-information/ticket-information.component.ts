import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {Ticket} from 'app/backend/interfaces/http';
import {HttpService} from 'app/backend/services/http.service';
import {UserService} from 'app/core/user/user.service';
import {Observable} from 'rxjs';
import {pluck} from 'rxjs/operators';
import {AsignarSoporteComponent} from '../asignar-soporte/asignar-soporte.component';
import {CerrarTicketComponent} from '../cerrar-ticket/cerrar-ticket.component';
import {environment} from '../../../../environments/environment';
import {TicketInfo} from '../interfaces/tickets-info.interfaces';

@Component({
	selector: 'app-ticket-information',
	templateUrl: './ticket-information.component.html',
	styleUrls: ['./ticket-information.component.scss']
})
export class TicketInformationComponent implements OnInit {
	@ViewChild('descripcion') descripcion: ElementRef;
	id$: Observable<string>;
	ticket$: Observable<TicketInfo>;
	files$: Observable<string[]>;
	permisosEspeciales$ = this.user.permisosEspecialesStr$;

	constructor(private ar: ActivatedRoute, private api: HttpService, private user: UserService, private dialog: MatDialog) {
	}


	ngOnInit(): void {
		this.id$ = this.ar.params.pipe(pluck('id'));
		this.id$.subscribe((val) => {
			this.ticket$ = this.api.getById<TicketInfo>('tickets', val);
			this.files$ = this.api.getById('documentos/list', val);
		});
	}

	cerrarTicket(): void {
		this.dialog.open(CerrarTicketComponent, {width: '80vw', disableClose: true, data: this.ticket$});
	}

	asignarSoporte(): void {
		this.dialog.open(AsignarSoporteComponent, {width: '80vw', disableClose: true, data: this.ticket$})
			.afterClosed()
			.subscribe((_) => {
				this.id$.subscribe(val => this.ticket$ = this.api.getById('tickets', val));
			});
	}

	openFile(name: string): string {
		return `${environment.backenduri}documentos/download/${name}`;
	}
}
