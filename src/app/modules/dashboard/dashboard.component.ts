import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from "chart.js";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  data: ChartData = {
    labels: ['enero', 'febrero'],
    datasets: [
      {
        data: [15, 20],
        label: 'test',
        fill: true,
        tension: 0.5,
        borderColor: 'rgba(255,0,0,0.8)',
        backgroundColor: 'rgba(255,0,0,0.3)',
      }
    ]
  }
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };
  constructor() { }

  ngOnInit(): void {
  }

}
