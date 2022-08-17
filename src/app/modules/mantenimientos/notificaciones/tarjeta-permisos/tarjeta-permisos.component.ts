import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from 'app/backend/services/http.service';
import { Observer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NotificacionesPorRol } from '../../interfaces';
import { FormulariosService } from '../services/formularios.service';

@Component({
  selector: 'app-tarjeta-permisos',
  templateUrl: './tarjeta-permisos.component.html',
  styleUrls: ['./tarjeta-permisos.component.scss']
})
export class TarjetaPermisosComponent implements OnInit {
  @Input() data: { rol: string, permisos: NotificacionesPorRol[] }
  group: FormGroup
  obs: Observer<any> = {
    next(value) {
      console.log(value)
    }, error(err) {
      console.error(err)
    }, complete() { },
  }
  constructor(private fb: FormBuilder, private util: FormulariosService, private api: HttpService) { }

  ngOnInit(): void {
    this.group = this.fb.group(this.util.getPermisosFormModel(this.data.permisos))
    for (const key in this.group.controls) {
      if (Object.prototype.hasOwnProperty.call(this.group.controls, key)) {
        const element = this.group.controls[key];
        element.valueChanges
          .pipe(switchMap(activo => this.api.update('notificaciones/porRol', key, { activo })))
          .subscribe(this.obs)
      }
    }


  }

}
