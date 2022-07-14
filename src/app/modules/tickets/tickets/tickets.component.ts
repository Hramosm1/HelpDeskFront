import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from 'app/backend/services/http.service';
import { Ticket, TicketResult } from 'app/modules/mantenimientos/interfaces';
import { NewTicketComponent } from '../new-ticket/new-ticket.component';
import { pluck, startWith, switchMap, tap } from "rxjs/operators";
import { merge, Observer, Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UtilsService } from 'app/core/services/utils.service';
import { UserService } from 'app/core/user/user.service';
import { FiltroTicketsComponent } from '../filtro-tickets/filtro-tickets.component';
import { Filtro } from '../interfaces/filtro.interfaces';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator
  control: FormControl = new FormControl('')
  dataSource: MatTableDataSource<Ticket> = new MatTableDataSource()
  displayedColumns = ['id', 'titulo', 'solicitudDe', 'estado', 'prioridad', 'fecha', 'activo', 'asignadoA']
  permisos$ = this._user.permisos$.pipe(pluck('Tickets'))
  totalRows: number = 0
  filtro: Filtro = {}
  emiterObserver$ = new Subject()
  update$: Subscription
  botonLimpiar: boolean = false
  observe: Observer<TicketResult> = {
    next: (data) => {
      this.dataSource.data = data.rows
      this.totalRows = data.count
    },
    error: (err) => { console.warn('este es el error ', err) },
    complete: () => { console.log('complete') }
  }

  constructor(private dialog: MatDialog, private api: HttpService, private router: Router, private util: UtilsService, private _user: UserService) { }
  ngOnInit(): void {
    this.control.valueChanges.subscribe(ob => this.dataSource.filter = ob)
  }
  ngAfterViewInit(): void {
    this.update$ = merge(
      this.emiterObserver$
        .pipe(switchMap(_ => this.util
          .getTickets(this.paginator.pageSize, this.paginator.pageIndex, this.filtro)
        )),
      this.paginator.page
        .pipe(
          startWith({}),
          switchMap(_ => this.util
            .getTickets(this.paginator.pageSize, this.paginator.pageIndex, this.filtro)
          ))
    )
      .subscribe(this.observe)
  }
  ngOnDestroy(): void {
    this.update$.unsubscribe()
  }
  openFilter() {
    this.dialog.open<FiltroTicketsComponent, Filtro, Filtro>(FiltroTicketsComponent, { disableClose: true, width: '80%', data: this.filtro })
      .afterClosed().subscribe(val => {
        this.filtro = val
        this.paginator.firstPage()
        this.emiterObserver$.next({})
        this.botonLimpiar = Object.keys(this.filtro).length > 0
      })
  }
  openDialog() {
    this.dialog.open(NewTicketComponent, { disableClose: true, width: '80%' })
      .afterClosed().subscribe(() => {
        this.paginator.firstPage()
        this.emiterObserver$.next({})
      })
  }
  actualizar() {
    this.filtro = {}
    this.botonLimpiar = false
    this.emiterObserver$.next({})
  }

}
