import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
interface RespuestaConfirmacion {
  action: boolean;
  id?: number | string;
}
interface Data {
  texto: string;
  id: number | string;
}
@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  cancelar: RespuestaConfirmacion;
  confirmar: RespuestaConfirmacion;
  constructor(@Inject(MAT_DIALOG_DATA) public data: Data) { }

  ngOnInit(): void {
    this.cancelar = { action: false };
    this.confirmar = { action: true, id: this.data.id };
  }

}
