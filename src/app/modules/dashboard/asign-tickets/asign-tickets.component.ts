import {Component, Input, OnInit} from '@angular/core';

@Component({
	selector: 'app-asign-tickets',
	templateUrl: './asign-tickets.component.html',
	styleUrls: ['./asign-tickets.component.scss']
})
export class AsignTicketsComponent implements OnInit {

	@Input() informacionTickets: any;

	@Input() displayedColumns: string[];

	constructor() {
	}

	ngOnInit(): void {
	}

}
