import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'app/backend/services/http.service';
import { Estado, Prioridad, SubCategoria, Usuario } from 'app/modules/mantenimientos/interfaces';
import { map, Observable } from 'rxjs';
import { chain } from "lodash";
import { MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from 'app/backend/services/authentication.service';

@Component({
  selector: 'app-new-ticket',
  templateUrl: './new-ticket.component.html',
  styleUrls: ['./new-ticket.component.scss']
})
export class NewTicketComponent implements OnInit {

  $categorias: Observable<any[]>
  $prioridades: Observable<Prioridad[]>
  $estados: Observable<Estado[]>
  $usuarios: Observable<Usuario[]>
  composeForm: FormGroup;
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
    private authApi: AuthenticationService,
    private cd: ChangeDetectorRef,
    private ref: MatDialogRef<NewTicketComponent>) { }

  ngOnInit(): void {
    this.crearObservables()
    this.crearFormulario()
  }
  crearObservables(): void {
    this.$usuarios = this.authApi.getAll<Usuario>('usuarios')
    this.$prioridades = this.api.getAll<Prioridad>('prioridades')
    this.$estados = this.api.getAll<Estado>('estados')
    this.$categorias = this.api.getAll<SubCategoria>('subCategorias')

      .pipe(map(of => {
        return chain(of).groupBy('categoria').map((subcategoria, grupo) => { return { grupo, subcategoria } }).value()
      }))
  }
  crearFormulario(): void {
    this.composeForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      prioridad: ['', Validators.required],
      estado: ['', Validators.required],
      categorias: [[], Validators.required],
      solicitudDe: ['', Validators.required],
      asignadoA: ['']
    });
  }
  cancel(): void {
    this.composeForm.reset()
    this.ref.close()
  }

  send(): void {
    console.log(this.composeForm.value)
  }
}
