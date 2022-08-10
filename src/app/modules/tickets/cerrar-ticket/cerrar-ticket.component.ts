import { AfterViewInit, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpService } from 'app/backend/services/http.service';
import { Estado } from 'app/modules/mantenimientos/interfaces';
import { pluck, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Ticket } from 'app/backend/interfaces/http';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'app-cerrar-ticket',
  templateUrl: './cerrar-ticket.component.html',
  styleUrls: ['./cerrar-ticket.component.scss']
})
export class CerrarTicketComponent implements OnInit {
  estados$ = this.api.getAll<Estado>('estados')
  formulario = this.fb.group({
    comentario: ['', Validators.required],
    idEstado: ['', Validators.required]
  })
  ticket: Ticket
  constructor(
    private api: HttpService,
    private dialogRef: MatDialogRef<CerrarTicketComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Observable<Ticket>,
    private router: Router,
    private fb: FormBuilder,
    private user: UserService
  ) { }

  ngOnInit(): void {
    this.data.pipe(take(1)).subscribe(dat => {
      this.ticket = dat
      this.formulario.patchValue({ idEstado: this.ticket.idEstado })
    })
  }
  confirmar() {
    this.user.user$.pipe(pluck('id')).subscribe(idUsuario => {
      const body = { ...this.formulario.value, idUsuario, activo: !this.ticket.activo }
      this.api.update('tickets/cerrar', this.ticket.id, body).subscribe(res => {
        this.dialogRef.close()
        this.router.navigateByUrl('tickets/list')
      })
    })
  }

}
