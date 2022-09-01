import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MantenimientosRoutingModule } from './mantenimientos-routing.module';
import { PrioridadesComponent } from './prioridades/prioridades.component';
import { CategoriasYSubCategoriasComponent } from './categorias-ysub-categorias/categorias-ysub-categorias.component';
import { EstadosComponent } from './estados/estados.component';
import { SharedModule } from 'app/shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CreacionEstadosComponent } from './estados/creacion-estados/creacion-estados.component';
import { CreacionPrioridadComponent } from './prioridades/creacion-prioridad/creacion-prioridad.component';
import { CreacionCategoriaComponent } from './categorias-ysub-categorias/creacion-categoria/creacion-categoria.component';
import { CreacionSubCategoriaComponent } from './categorias-ysub-categorias/creacion-sub-categoria/creacion-sub-categoria.component';
import { TablaCategoriasComponent } from './categorias-ysub-categorias/tabla-categorias/tabla-categorias.component';
import { TablaSubCategoriasComponent } from './categorias-ysub-categorias/tabla-sub-categorias/tabla-sub-categorias.component';
import { PersonalDeSoporteComponent } from './personal-de-soporte/personal-de-soporte.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { TarjetaPermisosComponent } from './notificaciones/tarjeta-permisos/tarjeta-permisos.component';

@NgModule({
  declarations: [
    PrioridadesComponent,
    CategoriasYSubCategoriasComponent,
    EstadosComponent,
    CreacionEstadosComponent,
    CreacionPrioridadComponent,
    CreacionCategoriaComponent,
    CreacionSubCategoriaComponent,
    TablaCategoriasComponent,
    TablaSubCategoriasComponent,
    PersonalDeSoporteComponent,
    NotificacionesComponent,
    TarjetaPermisosComponent,
  ],
  imports: [
    CommonModule,
    MantenimientosRoutingModule,
    SharedModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatCheckboxModule
  ]
})
export class MantenimientosModule { }
