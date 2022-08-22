import {Component, Input, OnInit} from '@angular/core';
import {ChartData, ChartOptions} from "chart.js";

@Component({
	selector: 'app-timelapse-tickets',
	templateUrl: './timelapse-tickets.component.html',
	styleUrls: ['./timelapse-tickets.component.scss']
})
export class TimelapseTicketsComponent implements OnInit {

	@Input() tpdData: ChartData<"bar">;

	@Input() options: ChartOptions<"bar">;

	constructor() {
	}

	ngOnInit(): void {
	}

}
