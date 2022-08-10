import { AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Ticket, TicketResult } from 'app/modules/mantenimientos/interfaces';
import { NewTicketComponent } from '../new-ticket/new-ticket.component';
import { pluck, startWith, switchMap } from "rxjs/operators";
import { merge, Observer, Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UtilsService } from 'app/core/services/utils.service';
import { UserService } from 'app/core/user/user.service';
import { FiltroTicketsComponent } from '../filtro-tickets/filtro-tickets.component';
import { Filtro } from '../interfaces/filtro.interfaces';
import { SocketsService } from 'app/shared/services/sockets.service';

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
  filtro: Filtro = JSON.parse(localStorage.getItem('filtro')) || {}
  pagez = Number(localStorage.getItem('pageSize')) || 10
  emiterObserver$ = new Subject()
  update$: Subscription
  botonLimpiar: boolean = false
  subscripcion: Subscription
  observe: Observer<TicketResult> = {
    next: (data) => {
      this.dataSource.data = data.rows
      this.totalRows = data.count
    },
    error: (err) => {
      this.dataSource.data = []
      this.totalRows = 0
      console.warn('este es el error ', err)
    },
    complete: () => { }
  }

  constructor(
    private dialog: MatDialog,
    private util: UtilsService,
    private _user: UserService,
    private socket: SocketsService,
    public router: Router
  ) {

  }
  ngOnInit(): void {
    this.control.valueChanges.subscribe(ob => this.dataSource.filter = ob)
    this.botonLimpiar = Object.entries(this.filtro).length > 0 ? true : false
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
    this.subscripcion = this.socket.nuevoTicket$.subscribe(_ => this.emiterObserver$.next({}))
    this.paginator.page.subscribe(({ pageSize }) => localStorage.setItem('pageSize', pageSize.toString()))
  }
  ngOnDestroy(): void {
    this.update$.unsubscribe()
    this.subscripcion.unsubscribe()
  }
  openFilter() {
    this.dialog.open<FiltroTicketsComponent, Filtro, Filtro>(FiltroTicketsComponent, { disableClose: true, width: '80%', data: this.filtro })
      .afterClosed().subscribe(val => {
        this.filtro = val
        localStorage.setItem('filtro', JSON.stringify(this.filtro))
        this.paginator.firstPage()
        this.emiterObserver$.next({})
        this.botonLimpiar = Object.keys(this.filtro).length > 0
      })
  }
  openDialog() {
    this.dialog.open(NewTicketComponent, { disableClose: true, width: '80%' })
      .afterClosed().subscribe(() => {
        this.paginator.firstPage()
      })
  }
  actualizar() {
    this.filtro = {}
    localStorage.setItem('filtro', JSON.stringify(this.filtro))
    this.botonLimpiar = false
    this.emiterObserver$.next({})
  }

}
