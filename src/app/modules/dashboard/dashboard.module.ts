import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {SharedModule} from 'app/shared/shared.module';
import {NgChartsModule} from 'ng2-charts';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatTableModule} from '@angular/material/table';
import {ActualTicketsComponent} from './actual-tickets/actual-tickets.component';
import {AsignTicketsComponent} from './asign-tickets/asign-tickets.component';
import {AverageTicketsComponent} from './average-tickets/average-tickets.component';
import {TimelapseTicketsComponent} from './timelapse-tickets/timelapse-tickets.component';
import {PipesModule} from "../../pipes/pipes.module";


@NgModule({
	declarations: [
		DashboardComponent,
		ActualTicketsComponent,
		AsignTicketsComponent,
		AverageTicketsComponent,
		TimelapseTicketsComponent
	],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        SharedModule,
        NgChartsModule,
        MatCardModule,
        MatIconModule,
        MatDividerModule,
        MatTableModule,
        PipesModule
    ]
})
export class DashboardModule {
}
