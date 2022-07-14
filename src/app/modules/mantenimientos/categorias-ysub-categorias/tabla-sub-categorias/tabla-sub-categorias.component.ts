import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from 'app/backend/services/http.service';
import { Permiso } from 'app/core/user/user.types';
import { ConfirmComponent } from 'app/shared/confirm/confirm.component';
import { SubCategoria } from '../../interfaces';
import { CreacionSubCategoriaComponent } from '../creacion-sub-categoria/creacion-sub-categoria.component';

@Component({
  selector: 'app-tabla-sub-categorias',
  templateUrl: './tabla-sub-categorias.component.html',
  styleUrls: ['./tabla-sub-categorias.component.scss']
})
export class TablaSubCategoriasComponent implements AfterViewInit {
  @Input() permisos: Permiso
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator
  dataSource: MatTableDataSource<SubCategoria> = new MatTableDataSource()
  displayedColumns: string[] = ['id', 'nombre', 'categoria', 'actions']
  constructor(private api: HttpService, private dialog: MatDialog) { }

  actualizar() {
    this.api.getAll<SubCategoria>('subCategorias').subscribe(res => this.dataSource.data = res)
  }
  openDialog(editar: boolean, row?: SubCategoria) {
    const dialogRef = this.dialog.open(CreacionSubCategoriaComponent, { width: '400px', data: { editar, row }, disableClose: true })
    dialogRef.afterClosed().subscribe(result => {
      if (result.action) {
        if (result.editar) {
          this.api.update('subCategorias', result.id, result.value).subscribe(res => this.actualizar())
        } else {
          this.api.create('subCategorias', result.value).subscribe(res => this.actualizar())
        }
      }
    })
  }
  eliminar(id: number, nombre: string) {
    const dialogRef = this.dialog.open(ConfirmComponent, { data: { texto: `¿Desea eliminar ${nombre}?`, id }, disableClose: true })
    dialogRef.afterClosed().subscribe(result => {
      if (result.action) {
        this.api.delete('subCategorias', result.id).subscribe(res => this.actualizar())
      }
    })
  }
  ngAfterViewInit(): void {
    this.api.getAll<SubCategoria>('subCategorias').subscribe(res => {
      this.dataSource.data = res
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator
    })
  }

}
