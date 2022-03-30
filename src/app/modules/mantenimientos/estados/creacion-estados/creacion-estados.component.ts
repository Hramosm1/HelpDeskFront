import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from 'app/backend/services/http.service';
interface Data {
  editar: boolean;
  nombre?: string;
  id?: number;
}
@Component({
  selector: 'app-creacion-estados',
  templateUrl: './creacion-estados.component.html',
  styleUrls: ['./creacion-estados.component.scss']
})
export class CreacionEstadosComponent implements OnInit {
  formulario: FormGroup
  constructor(
    private fb: FormBuilder,
    private api: HttpService,
    private ref: MatDialogRef<CreacionEstadosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data) { }

  ngOnInit(): void {
    if (this.data.editar) {
      this.formulario = this.fb.group({
        nombre: [this.data.nombre, Validators.required]
      })
    } else {
      this.formulario = this.fb.group({
        nombre: ['', Validators.required]
      })
    }
  }
  create(): void {
    if (this.data.editar) {
      this.ref.close({ action: true, value: this.formulario.value, editar: this.data.editar, id: this.data.id })
    } else {
      this.ref.close({ action: true, value: this.formulario.value, editar: this.data.editar })
    }
  }

}
