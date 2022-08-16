import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpService } from 'app/backend/services/http.service';
import { Estado, Prioridad, SubCategoria, Usuario } from 'app/modules/mantenimientos/interfaces';
import { map, tap } from 'rxjs';
import { chain } from 'lodash';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ListaDeUsuariosComponent } from 'app/shared/lista-de-usuarios/lista-de-usuarios.component';
import { UserService } from 'app/core/user/user.service';
import { QuillEditorComponent } from 'ngx-quill';
import { quillConfig } from 'app/core/config/quill.config';
import { omitBy, isNull } from 'lodash';

@Component({
  selector: 'app-new-ticket',
  templateUrl: './new-ticket.component.html',
  styleUrls: ['./new-ticket.component.scss']
})
export class NewTicketComponent implements OnInit, AfterViewInit {
  @ViewChild(QuillEditorComponent) editor: QuillEditorComponent;
  //**************VARIABLES OBSERVABLES**********************/
  $permisosEspeciales = this._user.permisosEspecialesStr$;
  $prioridades = this.api.getAll<Prioridad>('prioridades');
  $estados = this.api.getAll<Estado>('estados');
  $personal = this.api.getAll<Usuario>('personalDeSoporte');
  $categorias = this.api.getAll<SubCategoria>('subCategorias')
    .pipe(tap(console.log), map(of => chain(of)
        .groupBy('Categorias.nombre')
        .map((subcategoria, grupo) => ({ grupo, subcategoria }))
        .value()));
  /*****************FORMULARIO**************************/
  composeForm = this.fb.group({
    titulo: ['', Validators.required],
    descripcion: ['', Validators.required],
    prioridad: ['', Validators.required],
    estado: ['', Validators.required],
    categorias: [[], Validators.required],
    solicitudDe: ['', Validators.required],
    asignadoA: null
  });
  /******************************************************/
  usuarioSeleccionado: string = '';
  modules = quillConfig.modules;

  constructor(
    private fb: FormBuilder,
    private api: HttpService,
    private ref: MatDialogRef<NewTicketComponent>,
    private dialogref: MatDialogRef<ListaDeUsuariosComponent, Usuario>,
    private dialog: MatDialog,
    private _user: UserService,
  ) { }

  ngOnInit(): void {
    this.$categorias.subscribe(console.log);
    this._user.user$.subscribe((val) => {
      this.composeForm.controls.solicitudDe.setValue(val.id);
      this.usuarioSeleccionado = val.nombre;
    });
  }
  ngAfterViewInit(): void {
    this.editor.modules = quillConfig.modules;
  }

  cancel(): void {
    this.composeForm.reset();
    this.ref.close();
  }
  openModal() {
    this.dialogref = this.dialog.open(ListaDeUsuariosComponent, { width: '80vw' });
    this.dialogref.afterClosed().subscribe((val) => {
      if (val) {
        this.usuarioSeleccionado = val.nombre;
        this.composeForm.controls['solicitudDe'].setValue(val.id);
      }
    });
  }
  send(): void {
    const body = omitBy(this.composeForm.value, isNull);
    this.api.create('tickets', body).subscribe((res) => {
      this.ref.close();
    });
  }
}
