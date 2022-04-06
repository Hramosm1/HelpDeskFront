import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ListaDeUsuariosComponent } from 'app/shared/lista-de-usuarios/lista-de-usuarios.component';
import { Usuario } from '../interfaces';

@Component({
  selector: 'app-personal-de-soporte',
  templateUrl: './personal-de-soporte.component.html',
  styleUrls: ['./personal-de-soporte.component.scss']
})
export class PersonalDeSoporteComponent implements OnInit {
  dataSource: MatTableDataSource<Usuario[]> = new MatTableDataSource()
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(ListaDeUsuariosComponent, { width: '80vw' })
  }

}
