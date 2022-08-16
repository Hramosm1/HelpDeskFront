import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from 'app/backend/services/http.service';
import { Permiso } from 'app/core/user/user.types';
import { ConfirmComponent } from 'app/shared/confirm/confirm.component';
import { Categoria } from '../../interfaces';
import { CreacionCategoriaComponent } from '../creacion-categoria/creacion-categoria.component';

@Component({
  selector: 'app-tabla-categorias',
  templateUrl: './tabla-categorias.component.html',
  styleUrls: ['./tabla-categorias.component.scss']
})
export class TablaCategoriasComponent implements AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() permisos: Permiso;
  dataSource: MatTableDataSource<Categoria> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'nombre', 'actions'];
  constructor(private api: HttpService, private dialog: MatDialog) { }
  actualizar() {
    this.api.getAll<Categoria>('categorias').subscribe(res => this.dataSource.data = res);
  }
  openDialog(editar: boolean, row?: Categoria) {
    const dialogRef = this.dialog.open(CreacionCategoriaComponent, { width: '400px', data: { editar, row } });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.action) {
        if (result.editar) {
          this.api.update('categorias', result.id, result.value).subscribe(res => this.actualizar());
        } else {
          this.api.create('categorias', result.value).subscribe(res => this.actualizar());
        }
      }
    });
  }
  eliminar(id: number, nombre: string) {
    const dialogRef = this.dialog.open(ConfirmComponent, { data: { texto: `¿Desea eliminar ${nombre}?`, id }, disableClose: true });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.action) {
        this.api.delete('categorias', result.id).subscribe(res => this.actualizar());
      }
    });
  }
  ngAfterViewInit(): void {
    this.api.getAll<Categoria>('categorias').subscribe((res) => {
      this.dataSource.data = res;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

}
