import { Injectable } from '@angular/core';
import { NotificacionesPorRol } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class FormulariosService {

  constructor() { }
  getPermisosFormModel(permisos: NotificacionesPorRol[]) {
    return permisos.reduce((prev, { id, activo }) => ({ ...prev, [id]: activo }), {})
  }
}
