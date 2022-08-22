import {Component, Input, OnInit} from '@angular/core';
import {ChartData} from "chart.js";

@Component({
	selector: 'app-actual-tickets',
	templateUrl: './actual-tickets.component.html',
	styleUrls: ['./actual-tickets.component.scss']
})
export class ActualTicketsComponent implements OnInit {

	@Input() data: ChartData<"bar">;

	constructor() {
	}

	ngOnInit(): void {
	}

}
