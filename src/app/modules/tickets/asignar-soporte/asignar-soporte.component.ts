import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ticket } from 'app/backend/interfaces/http';
import { HttpService } from 'app/backend/services/http.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-asignar-soporte',
  templateUrl: './asignar-soporte.component.html',
  styleUrls: ['./asignar-soporte.component.scss']
})
export class AsignarSoporteComponent implements OnInit {
  personal$ = this.api.getAll('personalDeSoporte')
  control = new FormControl()
  data: Ticket
  constructor(@Inject(MAT_DIALOG_DATA) public ticket: Observable<Ticket>, private api: HttpService, private dialogRef: MatDialogRef<AsignarSoporteComponent>) { }

  ngOnInit(): void {
    this.ticket.subscribe(val => {
      this.data = val
      this.control.setValue(val.idAsignado)
    })
  }
  confirmar() {
    this.api.update('tickets', this.data.id, { personal: this.control.value }).subscribe(res => {
      if (res.rowsAffected[0] > 0) {
        this.dialogRef.close()
      }
    })
  }
}
