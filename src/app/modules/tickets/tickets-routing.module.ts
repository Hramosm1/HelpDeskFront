import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketInformationComponent } from './ticket-information/ticket-information.component';
import { TicketsComponent } from "./tickets/tickets.component";

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: TicketsComponent },
  { path: ':id', component: TicketInformationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule { }
