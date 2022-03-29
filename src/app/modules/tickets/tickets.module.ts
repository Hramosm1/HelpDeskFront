import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsRoutingModule } from './tickets-routing.module';
import { TicketsComponent } from './tickets/tickets.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatCardModule } from "@angular/material/card";
import { NewTicketComponent } from './new-ticket/new-ticket.component';
import { PipesModule } from 'app/pipes/pipes.module';
import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [
    TicketsComponent,
    NewTicketComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    SharedModule,
    MatIconModule,
    MatTableModule,
    TicketsRoutingModule,
    MatPaginatorModule,
    MatCardModule,
    PipesModule,
    QuillModule.forRoot(),
  ]
})
export class TicketsModule { }
