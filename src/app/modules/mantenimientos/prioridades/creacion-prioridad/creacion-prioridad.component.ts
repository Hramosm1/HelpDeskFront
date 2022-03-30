import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Prioridad } from '../../interfaces';
interface Data {
  editar: boolean;
  row: Prioridad
}
@Component({
  selector: 'app-creacion-prioridad',
  templateUrl: './creacion-prioridad.component.html',
  styleUrls: ['./creacion-prioridad.component.scss']
})
export class CreacionPrioridadComponent implements OnInit {
  formulario: FormGroup
  constructor(
    private ref: MatDialogRef<CreacionPrioridadComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Data
  ) { }

  ngOnInit(): void {
    if (this.data.editar) {
      this.formulario = this.fb.group({
        nombre: [this.data.row.nombre, Validators.required],
        color: [this.data.row.color, Validators.required]
      })
    } else {
      this.formulario = this.fb.group({
        nombre: ['', Validators.required],
        color: ['', Validators.required]
      })
    }
  }
  create(): void {
    if (this.data.editar) {
      this.ref.close({ action: true, value: this.formulario.value, editar: this.data.editar, id: this.data.row.id })
    } else {
      this.ref.close({ action: true, value: this.formulario.value, editar: this.data.editar })
    }
  }

}
