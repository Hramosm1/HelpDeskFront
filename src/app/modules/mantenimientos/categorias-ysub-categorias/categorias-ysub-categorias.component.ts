import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/core/user/user.service';
import { pluck } from 'rxjs';

@Component({
  selector: 'app-categorias-ysub-categorias',
  templateUrl: './categorias-ysub-categorias.component.html',
  styleUrls: ['./categorias-ysub-categorias.component.scss']
})
export class CategoriasYSubCategoriasComponent implements OnInit {
  permisos$ = this._user.permisos$.pipe(pluck('Mantenimientos'))
  constructor(private _user: UserService) { }

  ngOnInit(): void {
  }

}
