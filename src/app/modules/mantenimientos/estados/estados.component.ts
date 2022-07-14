import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from 'app/backend/services/http.service';
import { UserService } from 'app/core/user/user.service';
import { ConfirmComponent } from 'app/shared/confirm/confirm.component';
import { pluck } from 'rxjs';
import { Estado } from '../interfaces';
import { CreacionEstadosComponent } from './creacion-estados/creacion-estados.component';

@Component({
  selector: 'app-estados',
  templateUrl: './estados.component.html',
  styleUrls: ['./estados.component.scss']
})
export class EstadosComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort
  dataSource: MatTableDataSource<Estado> = new MatTableDataSource()
  displayedColumns: string[] = ['id', 'nombre', 'actions']
  permisos$ = this._user.permisos$.pipe(pluck('Mantenimientos'))
  constructor(private dialog: MatDialog, private api: HttpService, private _user: UserService) { }

  ngAfterViewInit(): void {
    this.api.getAll<Estado>('estados').subscribe(res => {
      this.dataSource.data = res
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    })
  }
  actualizar() { this.api.getAll<Estado>('estados').subscribe(res => this.dataSource.data = res) }
  openDialog(editar: boolean, nombre?: string, id?: number) {
    const dialogRef = this.dialog.open(CreacionEstadosComponent, { width: '400px', data: { editar, nombre, id }, disableClose: true })
    dialogRef.afterClosed().subscribe(result => {
      if (result.action) {
        if (result.editar) {
          this.api.update('estados', result.id, result.value).subscribe(res => this.actualizar())
        } else {
          this.api.create('estados', result.value).subscribe(res => this.actualizar())
        }
      }
    })
  }
  eliminar(id: number, nombre: string) {
    const dialogRef = this.dialog.open(ConfirmComponent, { data: { texto: `¿Desea eliminar ${nombre}?`, id }, disableClose: true })
    dialogRef.afterClosed().subscribe(result => {
      if (result.action) {
        this.api.delete('estados', result.id).subscribe(res => this.actualizar())
      }
    })
  }
}
