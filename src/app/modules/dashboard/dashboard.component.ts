import {Component, OnInit} from '@angular/core';
import {HttpService} from 'app/backend/services/http.service';
import {ChartData, ChartOptions} from 'chart.js';
import {groupBy} from 'lodash';
import {AverageTickets, TicketsInfo, TicketsPorDia, TiempoPromedio} from './dashboard.interface';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
	mes: number;
	informacionTickets;
	options: ChartOptions<'bar'> = {
		maintainAspectRatio: true,
		aspectRatio: 4 / 1,
		scales: {
			x: {
				stacked: true,
			},
			y: {
				stacked: true
			}
		}
	};
	data: ChartData<'bar'>;
	displayedColumns = ['personalAsignado', 'activos', 'cerrados'];
	tiemposPromedio: TiempoPromedio[];
	tpdData: ChartData<'bar'>;

	constructor(private api: HttpService) {
	}

	ngOnInit(): void {
		this.mes = new Date().getMonth() + 1;
		this.api.getDashboard<TicketsInfo>('stats', this.mes)
			.subscribe(({ticketsActivos, ticketsCerrados, ticketsPorUsuario}) => {
				this.data = {
					labels: ['Tickets por mes'],
					datasets: [
						{
							label: 'Tickets Activos',
							data: [ticketsActivos]
						},
						{
							label: 'Tickets cerrados',
							data: [ticketsCerrados]
						},
						{
							label: 'Total tickets',
							data: [ticketsCerrados + ticketsActivos]
						}
					]
				};
				this.informacionTickets = ticketsPorUsuario;
			});
		this.api.getDashboard<AverageTickets[]>('average', this.mes).subscribe((av) => {
			const gp = groupBy(av, 'personal');
			const result = [];
			for (const key in gp) {
				if (Object.prototype.hasOwnProperty.call(gp, key)) {
					const list = gp[key];
					const suma = list.reduce((prev, {tiempoAbierto}) => (prev + tiempoAbierto), 0);
					const promedioNumber = suma / list.length;
					const horas = Math.floor(promedioNumber / (60 * 60));
					const minutos = Math.floor(promedioNumber / 60) - (horas * 60);
					const segundos = Math.floor(promedioNumber - (minutos * 60) - (horas * 60 * 60));
					const promedio = `${horas}h: ${minutos}m: ${segundos}s`;
					result.push({personal: key, promedio});
				}
			}
			this.tiemposPromedio = result;
		});
		this.api.getDashboard<TicketsPorDia[]>('graph', this.mes).subscribe((x) => {
			const gp = groupBy(x, 'dia');
			const ticketsPorDia: Array<TicketsPorDia[]> = Object.values(gp)
				.map((row: TicketsPorDia[]) => {
					if (row.length === 1) {
						row.push({dia: row[0].dia, tickets: 0, accion: 'Cierre de ticket'});
					}
					return row;
				});
			this.tpdData = {
				labels: ticketsPorDia.map(val => val[0].dia.substring(0, 10)),
				datasets: [
					{
						label: 'Tickets creados',
						data: ticketsPorDia.map(x => x[1].tickets)
					},
					{
						label: 'Tickets cerrados',
						data: ticketsPorDia.map(x => x[0].tickets)
					}
				]
			};
		});
	}

}
