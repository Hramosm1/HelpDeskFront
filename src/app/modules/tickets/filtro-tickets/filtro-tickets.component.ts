import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from 'app/backend/services/http.service';
import { omitBy, isNull } from 'lodash'
import { Filtro } from '../interfaces/filtro.interfaces';


@Component({
  selector: 'app-filtro-tickets',
  templateUrl: './filtro-tickets.component.html',
  styleUrls: ['./filtro-tickets.component.scss'],
  providers: [
  ]
})
export class FiltroTicketsComponent {
  formulario = this.fb.group({
    id: null,
    titulo: null,
    solicitudDe: null,
    idEstado: null,
    idPrioridad: null,
    desde: null,
    hasta: null,
    asignadoA: null,
    activo: null
  })
  get desde() {
    return this.formulario.get('desde') as FormControl
  }
  get hasta() {
    return this.formulario.get('hasta') as FormControl
  }
  personal$ = this.api.getAll('personalDeSoporte')
  prioridades$ = this.api.getAll('prioridades')
  estados$ = this.api.getAll('estados')
  usuarios$ = this.api.getAll('usuarios')
  constructor(private fb: FormBuilder, private api: HttpService, private dialogRef: MatDialogRef<FiltroTicketsComponent>, @Inject(MAT_DIALOG_DATA) public data: Filtro) {
    this.formulario.patchValue(data)
  }
  submit() {
    const post = omitBy(this.formulario.value, isNull)
    this.dialogRef.close(post)
  }
}
