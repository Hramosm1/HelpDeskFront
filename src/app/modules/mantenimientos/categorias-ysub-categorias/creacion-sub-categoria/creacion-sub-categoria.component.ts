import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from 'app/backend/services/http.service';
import { Categoria, DataDialog, SubCategoria } from '../../interfaces';

@Component({
  selector: 'app-creacion-sub-categoria',
  templateUrl: './creacion-sub-categoria.component.html',
  styleUrls: ['./creacion-sub-categoria.component.scss']
})
export class CreacionSubCategoriaComponent implements OnInit {
  formulario: FormGroup;
  categorias: Categoria[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DataDialog<SubCategoria>,
    private fb: FormBuilder,
    private ref: MatDialogRef<CreacionSubCategoriaComponent>,
    private api: HttpService
  ) {
    api.getAll<Categoria>('categorias').subscribe(res => this.categorias = res);
  }
  ngOnInit(): void {
    if (this.data.editar) {
      this.formulario = this.fb.group({ nombre: [this.data.row.nombre, Validators.required], idCategoria: [this.data.row.idCategoria, Validators.required] });
    } else {
      this.formulario = this.fb.group({ nombre: ['', Validators.required], idCategoria: ['', Validators.required] });
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
