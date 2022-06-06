import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { createResponse } from 'app/backend/interfaces/http';
import { HttpService } from 'app/backend/services/http.service';
import { UserService } from 'app/core/user/user.service';
import { ListaDeUsuariosComponent } from 'app/shared/lista-de-usuarios/lista-de-usuarios.component';
import { pluck, tap } from 'rxjs';
import { Usuario } from '../interfaces';

@Component({
  selector: 'app-personal-de-soporte',
  templateUrl: './personal-de-soporte.component.html',
  styleUrls: ['./personal-de-soporte.component.scss']
})
export class PersonalDeSoporteComponent implements OnInit {
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource()
  dialogRef: MatDialogRef<any, Usuario>
  cargando: boolean = false
  displayedColumns = ['nombre', 'actions']
  permisos$ = this._user.permisos$.pipe(pluck('Mantenimientos'))
  constructor(private dialog: MatDialog, private api: HttpService, private _user: UserService) { }

  ngOnInit(): void {
    this.api.getAll<Usuario>('personalDeSoporte').pipe(tap(console.log)).subscribe(data => this.dataSource.data = data)
  }

  openDialog() {
    this.dialogRef = this.dialog.open(ListaDeUsuariosComponent, { width: '80vw' })
    this.dialogRef.afterClosed().subscribe(val => {
      this.cargando = true
      this.api.create('personalDeSoporte', { idUsuario: val.id }).subscribe({ next: this.actualizar, complete: () => this.cargando = false })
    })
  }
  eliminar(id: number) {
    this.api.delete('personalDeSoporte', id).subscribe(this.actualizar)
  }

  private actualizar = (val: createResponse) => {
    if (val.rowsAffected[0] > 0) {
      this.api.getAll<Usuario>('personalDeSoporte').subscribe(data => this.dataSource.data = data)
    }
  }
}
