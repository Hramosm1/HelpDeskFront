import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewTicketComponent } from './new-ticket/new-ticket.component';
import { TicketsComponent } from "./tickets/tickets.component";

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: TicketsComponent },
  { path: 'newTicket', component: NewTicketComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule { }
