import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../../backend/services/http.service';
import {CalificacionInfoResult} from '../interfaces/filtro.interfaces';
import {ActivatedRoute, Router} from '@angular/router';
import {mergeMap, Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {UserService} from '../../../core/user/user.service';
import {combineLatest} from 'rxjs';
import {User} from '../../../core/user/user.types';
import {NotificationsService} from '../../../layout/common/notifications/notifications.service';


@Component({
	selector: 'app-calificacion',
	templateUrl: './calificacion.component.html',
	styleUrls: ['./calificacion.component.scss']
})
export class CalificacionComponent implements OnInit {
	data$: Observable<CalificacionInfoResult> = this.ar.params
		.pipe(mergeMap(({id}) => this.api
			.getById<CalificacionInfoResult>('calificaciones', id)));

	qualityForm: FormGroup = this.fb.group({
		calificacion: [0, Validators.required],
		comentario: ['']
	});
	ids$: Observable<any>;

	constructor(private api: HttpService,
							private ar: ActivatedRoute,
							private fb: FormBuilder,
							private user: UserService,
							private activeRoute: ActivatedRoute,
							private router: Router,
							private notificaciones: NotificationsService) {
	}

	ngOnInit(): void {
		this.ids$ = combineLatest({
			user: this.user.user$,
			route: this.activeRoute.params
		});
	}

	calificar(): void {
		const body: { calificacion: number; comentario: string } = this.qualityForm.value;
		if (body.calificacion < 4 && body.comentario.length < 1) {
			Swal.fire({
				title: 'Tu calificacion baja',
				text: 'Parece que no recibiste la atencion que necesitabas, por favor deja un comentario para que podamos mejorar',
				icon: 'info',
				confirmButtonText: 'Escribir comentario'
			});
		} else {
			this.ids$.subscribe(({user, route}: { user: User; route: { id: string } }) => {
				this.api.calificarTicket(route.id, user.id, this.qualityForm.value).subscribe(() => {
					this.notificaciones.getAll();
					this.router.navigateByUrl('/tickets/list');
				});
			});
		}
	}


}
