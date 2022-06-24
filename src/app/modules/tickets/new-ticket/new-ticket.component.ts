import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'app/backend/services/http.service';
import { Estado, Prioridad, SubCategoria, Usuario } from 'app/modules/mantenimientos/interfaces';
import { map, Observable, reduce } from 'rxjs';
import { chain } from "lodash";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ListaDeUsuariosComponent } from 'app/shared/lista-de-usuarios/lista-de-usuarios.component';
import { UserService } from 'app/core/user/user.service';
import { PermisosEspecial } from 'app/core/user/user.types';

@Component({
  selector: 'app-new-ticket',
  templateUrl: './new-ticket.component.html',
  styleUrls: ['./new-ticket.component.scss']
})
export class NewTicketComponent implements OnInit {
  //**************VARIABLES OBSERVABLES**********************/
  $permisosEspeciales = this._user.permisosEspecialesStr$
  $prioridades = this.api.getAll<Prioridad>('prioridades')
  $estados = this.api.getAll<Estado>('estados')
  $personal = this.api.getAll<Usuario>('personalDeSoporte')
  $categorias = this.api.getAll<SubCategoria>('subCategorias')
    .pipe(map(of => {
      return chain(of)
        .groupBy('categoria')
        .map((subcategoria, grupo) => { return { grupo, subcategoria } })
        .value()
    }))
  /*****************FORMULARIO**************************/
  composeForm = this.fb.group({
    titulo: ['', Validators.required],
    descripcion: ['', Validators.required],
    prioridad: ['', Validators.required],
    estado: ['', Validators.required],
    categorias: [[], Validators.required],
    solicitudDe: ['', Validators.required],
    asignadoA: ['']
  });
  /******************************************************/
  usuarioSeleccionado: string = ''
  quillModules: any = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ align: [] }, { list: 'ordered' }, { list: 'bullet' }],
      ['clean']
    ]
  };

  constructor(
    private fb: FormBuilder,
    private api: HttpService,
    private ref: MatDialogRef<NewTicketComponent>,
    private dialogref: MatDialogRef<ListaDeUsuariosComponent, Usuario>,
    private dialog: MatDialog,
    private _user: UserService) { }

  ngOnInit(): void {
    this._user.user$.subscribe(val => {
      this.composeForm.controls.solicitudDe.setValue(val.id)
      this.usuarioSeleccionado = val.nombre
    })
  }

  cancel(): void {
    this.composeForm.reset()
    this.ref.close()
  }
  openModal() {
    this.dialogref = this.dialog.open(ListaDeUsuariosComponent, { width: '80vw' })
    this.dialogref.afterClosed().subscribe(val => {
      if (val) {
        this.usuarioSeleccionado = val.nombre
        this.composeForm.controls['solicitudDe'].setValue(val.id)
      }
    })
  }
  send(): void {
    this.api.create('tickets', this.composeForm.value).subscribe(res => {
      if (res.rowsAffected[0] > 0) { this.ref.close() }
    })
  }
}
