import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Categoria, DataDialog } from '../../interfaces';

@Component({
  selector: 'app-creacion-categoria',
  templateUrl: './creacion-categoria.component.html',
  styleUrls: ['./creacion-categoria.component.scss']
})
export class CreacionCategoriaComponent implements OnInit {
  formulario: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DataDialog<Categoria>,
    private fb: FormBuilder,
    private ref: MatDialogRef<CreacionCategoriaComponent>
  ) { }

  ngOnInit(): void {
    if (this.data.editar) {
      this.formulario = this.fb.group({ nombre: [this.data.row.nombre, Validators.required] });
    } else {
      this.formulario = this.fb.group({ nombre: ['', Validators.required] });
    }
  }

  create(): void {
    if (this.data.editar) {
      this.ref.close({ action: true, value: this.formulario.value, editar: this.data.editar, id: this.data.row.id });
    } else {
      this.ref.close({ action: true, value: this.formulario.value, editar: this.data.editar });
    }
  }

}
