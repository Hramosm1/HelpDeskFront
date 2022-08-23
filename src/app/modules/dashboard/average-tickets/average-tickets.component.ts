import {Component, Input, OnInit} from '@angular/core';
import {TiempoPromedio} from '../dashboard.interface';

@Component({
	selector: 'app-average-tickets',
	templateUrl: './average-tickets.component.html',
	styleUrls: ['./average-tickets.component.scss']
})
export class AverageTicketsComponent implements OnInit {

	@Input() tiemposPromedio: TiempoPromedio[];

	constructor() {
	}

	ngOnInit(): void {
	}

}
