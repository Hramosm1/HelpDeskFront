import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsRoutingModule } from './tickets-routing.module';
import { TicketsComponent } from './tickets/tickets.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { NewTicketComponent } from './new-ticket/new-ticket.component';
import { PipesModule } from 'app/pipes/pipes.module';
import { QuillModule } from 'ngx-quill';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { TicketInformationComponent } from './ticket-information/ticket-information.component';
import { CommentsComponent } from './comments/comments.component';
import { CerrarTicketComponent } from './cerrar-ticket/cerrar-ticket.component';
import { AsignarSoporteComponent } from './asignar-soporte/asignar-soporte.component';
import { quillConfig } from 'app/core/config/quill.config';
import { FiltroTicketsComponent } from './filtro-tickets/filtro-tickets.component';
import { MatDatepickerModule, } from '@angular/material/datepicker';
import { LuxonDateAdapter, MatLuxonDateModule } from '@angular/material-luxon-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { DATA_CONFIG } from './interfaces/filtro.interfaces';
@NgModule({
  declarations: [
    TicketsComponent,
    NewTicketComponent,
    TicketInformationComponent,
    CommentsComponent,
    CerrarTicketComponent,
    AsignarSoporteComponent,
    FiltroTicketsComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    SharedModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    TicketsRoutingModule,
    MatPaginatorModule,
    MatCardModule,
    PipesModule,
    MatAutocompleteModule,
    MatSidenavModule,
    MatSortModule,
    MatDatepickerModule,
    MatLuxonDateModule,
    QuillModule.forRoot(quillConfig),
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es' },
    { provide: DateAdapter, useClass: LuxonDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: DATA_CONFIG }
  ]
})
export class TicketsModule { }
