import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../../backend/services/http.service';
import {CalificacionInfoResult} from '../interfaces/filtro.interfaces';
import {ActivatedRoute} from '@angular/router';
import {mergeMap, Observable} from 'rxjs';

@Component({
	selector: 'app-calificacion',
	templateUrl: './calificacion.component.html',
	styleUrls: ['./calificacion.component.scss']
})
export class CalificacionComponent implements OnInit {
	data$: Observable<CalificacionInfoResult>=this.ar.params
		.pipe(mergeMap(({id}) => this.api
			.getById<CalificacionInfoResult>('calificaciones', id)));

	constructor(private api: HttpService, private ar: ActivatedRoute) {
	}

	ngOnInit(): void {
	}

}
