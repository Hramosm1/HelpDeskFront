import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from 'app/backend/services/http.service';
import { UserService } from 'app/core/user/user.service';
import { ConfirmComponent } from 'app/shared/confirm/confirm.component';
import { map, pluck } from 'rxjs';
import { Prioridad } from '../interfaces';
import { groupBy } from 'lodash';
import { CreacionPrioridadComponent } from './creacion-prioridad/creacion-prioridad.component';

@Component({
  selector: 'app-prioridades',
  templateUrl: './prioridades.component.html',
  styleUrls: ['./prioridades.component.scss']
})
export class PrioridadesComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'nombre', 'color', 'actions'];
  formulario: FormGroup;
  permisos$ = this._user.permisos$.pipe(pluck('Mantenimientos'));

  constructor(private fb: FormBuilder, private api: HttpService, private dialog: MatDialog, private _user: UserService) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      color: ''
    });
  }
  ngAfterViewInit(): void {
    this.api.getAll<Prioridad>('prioridades').subscribe((res) => {
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  actualizar() { this.api.getAll<Prioridad>('prioridades').subscribe(res => this.dataSource.data = res); }
  openDialog(editar: boolean, row?: Prioridad) {
    const dialogRef = this.dialog.open(CreacionPrioridadComponent, { width: '400px', data: { editar, row } });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.action) {
        if (result.editar) {
          this.api.update('prioridades', result.id, result.value).subscribe((res) => {
            this.actualizar();
          });
        } else {
          this.api.create('prioridades', result.value).subscribe((res) => {
            this.actualizar();
          });
        }
      }
    });
  }
  eliminar(id: number, nombre: string) {
    const dialogRef = this.dialog.open(ConfirmComponent, { data: { texto: `¿Desea eliminar ${nombre}?`, id }, disableClose: true });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.action) {
        this.api.delete('prioridades', result.id).subscribe(res => this.actualizar());
      }
    });
  }

}
