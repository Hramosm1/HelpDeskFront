import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationService } from 'app/backend/services/authentication.service';
import { Usuario } from 'app/modules/mantenimientos/interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lista-de-usuarios',
  templateUrl: './lista-de-usuarios.component.html',
  styleUrls: ['./lista-de-usuarios.component.scss']
})
export class ListaDeUsuariosComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator
  $usuarios: Observable<Usuario[]>
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource()
  filtro: FormControl = new FormControl('')
  displayedColumns: string[] = ['id', 'usuario', 'nombre', 'correo']
  constructor(private authApi: AuthenticationService, private ref: MatDialogRef<ListaDeUsuariosComponent>) { }

  ngOnInit(): void {
    this.$usuarios = this.authApi.getAll<Usuario>('usuarios')
    this.filtro.valueChanges.subscribe(val => this.dataSource.filter = val)
  }
  ngAfterViewInit(): void {
    this.$usuarios.subscribe(data => {
      this.dataSource.data = data
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator
    })
  }
  send(row: Usuario) {
    this.ref.close(row)
  }
}
