import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
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
  estados$ = this.api.getAll('estados')
  formulario = this.fb.group({
    personal: [null, Validators.required],
    estado: [null, Validators.required]
  })
  id: number
  constructor(
    @Inject(MAT_DIALOG_DATA) public ticket: Observable<Ticket>,
    private api: HttpService,
    private dialogRef: MatDialogRef<AsignarSoporteComponent>,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.ticket.subscribe(({ id, idEstado, idAsignado }) => {
      this.id = id
      this.formulario.controls.personal.setValue(idAsignado)
      this.formulario.controls.estado.setValue(idEstado)
    })
  }
  confirmar() {
    this.api.update('tickets', this.id, this.formulario.value).subscribe(res => this.dialogRef.close())
  }
}
