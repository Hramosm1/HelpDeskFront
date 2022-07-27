import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasYSubCategoriasComponent } from './categorias-ysub-categorias/categorias-ysub-categorias.component';
import { EstadosComponent } from './estados/estados.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { PersonalDeSoporteComponent } from './personal-de-soporte/personal-de-soporte.component';
import { PrioridadesComponent } from './prioridades/prioridades.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'prioridades' },
  { path: 'prioridades', component: PrioridadesComponent },
  { path: 'estados', component: EstadosComponent },
  { path: 'categorias', component: CategoriasYSubCategoriasComponent },
  { path: 'personal-de-soporte', component: PersonalDeSoporteComponent },
  { path: 'notificaciones', component: NotificacionesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MantenimientosRoutingModule { }
