import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/backend/services/authentication.service';
import { HttpService } from 'app/backend/services/http.service';
import { BasicInterface } from '../interfaces';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.scss']
})
export class NotificacionesComponent implements OnInit {

  roles$ = this.authApi.getAll<BasicInterface>('roles')
  constructor(private authApi: AuthenticationService) { }

  ngOnInit(): void {
  }

}
