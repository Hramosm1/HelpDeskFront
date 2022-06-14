import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from 'app/backend/services/http.service';
import { Ticket, TablaTicket } from 'app/modules/mantenimientos/interfaces';
import { NewTicketComponent } from '../new-ticket/new-ticket.component';
import { map, mergeMap, pluck, tap } from "rxjs/operators";
import { Observer } from 'rxjs';
import { Router } from '@angular/router';
import { UtilsService } from 'app/core/services/utils.service';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator
  control: FormControl = new FormControl('')
  dataSource: MatTableDataSource<TablaTicket> = new MatTableDataSource()
  displayedColumns = ['id', 'titulo', 'solicitudDe', 'estado', 'prioridad', 'fecha', 'activo', 'asignadoA',]
  permisos$ = this._user.permisos$.pipe(pluck('Tickets'))


  observe: Observer<TablaTicket[]> = {
    next: (data) => {
      this.dataSource.data = data
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort
    },
    error: (err) => { console.warn('este es el error ', err) },
    complete: () => { }
  }

  constructor(private dialog: MatDialog, private api: HttpService, private router: Router, private util: UtilsService, private _user: UserService) { }
  ngOnInit(): void {
    this.control.valueChanges.subscribe(ob => this.dataSource.filter = ob)
    this.util.tickets$.subscribe(this.observe)
  }
  ngOnDestroy(): void {

  }
  method(row: any) {
    this.router.navigateByUrl('tickets/' + row.id)
  }
  openDialog() {
    const dialogRef = this.dialog.open(NewTicketComponent, { disableClose: true, width: '80%' })
    dialogRef.afterClosed().subscribe(() => {
      this.util.tickets$.subscribe(this.observe)
    })
  }
  dialogRight() { }

}
