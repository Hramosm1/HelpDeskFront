// noinspection ES6UnusedImports

import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {HttpService} from 'app/backend/services/http.service';
import {pluck, take} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Ticket} from 'app/backend/interfaces/http';
import {UserService} from 'app/core/user/user.service';

@Component({
	selector: 'app-cerrar-ticket',
	templateUrl: './cerrar-ticket.component.html',
	styleUrls: ['./cerrar-ticket.component.scss']
})
export class CerrarTicketComponent implements OnInit {
	formulario = this.fb.group({
		comentario: ['', Validators.required],
	});
	ticket: Ticket;

	constructor(
		private api: HttpService,
		private dialogRef: MatDialogRef<CerrarTicketComponent>,
		@Inject(MAT_DIALOG_DATA) private data: Observable<Ticket>,
		private router: Router,
		private fb: FormBuilder,
		private user: UserService
	) {
	}

	ngOnInit(): void {
		this.data.pipe(take(1)).subscribe((dat) => {
			this.ticket = dat;
			this.formulario.patchValue({idEstado: this.ticket.idEstado});
		});
	}

	confirmar(): void {
		this.user.user$.pipe(pluck('id')).subscribe((idUsuario) => {
			const body = {...this.formulario.value, idUsuario, activo: !this.ticket.activo};
			this.api.update('tickets/cerrar', this.ticket.id, body)
				.subscribe(() => {
					this.dialogRef.close();
					this.router.navigateByUrl('tickets/list');
				});
		});
	}

}
