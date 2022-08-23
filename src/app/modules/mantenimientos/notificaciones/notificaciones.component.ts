import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/backend/services/authentication.service';
import { HttpService } from 'app/backend/services/http.service';
import { groupBy } from 'lodash';
import { map } from 'rxjs';
import { BasicInterface, NotificacionesPorRol } from '../interfaces';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.scss']
})
export class NotificacionesComponent implements OnInit {

  roles$ = this.authApi.getAll<BasicInterface>('roles');
  permisos$ = this.api.getAll<NotificacionesPorRol[]>('notificaciones/porRol')
    .pipe(map((res) => {
      const ar = [];
      const grouping = groupBy(res, 'rol');
      for (const rol in grouping) {
        if (Object.prototype.hasOwnProperty.call(grouping, rol)) {
          const permisos = grouping[rol];
          ar.push({ rol, permisos });
        }
      }
      return ar;
    }));

  constructor(private authApi: AuthenticationService, private api: HttpService) { }

  ngOnInit(): void {
  }

}
