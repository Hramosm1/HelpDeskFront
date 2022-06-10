import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpService } from 'app/backend/services/http.service';
import { Estado } from 'app/modules/mantenimientos/interfaces';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cerrar-ticket',
  templateUrl: './cerrar-ticket.component.html',
  styleUrls: ['./cerrar-ticket.component.scss']
})
export class CerrarTicketComponent implements OnInit {
  estados$ = this.api.getAll<Estado>('estados')
  control = new FormControl('', Validators.required)
  ticket
  constructor(private api: HttpService, private dialogRef: MatDialogRef<CerrarTicketComponent>, @Inject(MAT_DIALOG_DATA) private data: Observable<any>, private router: Router) { }

  ngOnInit(): void {
    this.data.pipe(take(1)).subscribe(dat => {
      this.ticket = dat
      this.control.setValue(this.ticket.idEstado)
    })
  }
  confirmar() {
    const body = { idEstado: this.control.value }
    this.api.update('tickets/cerrar', this.ticket.id, body).subscribe(res => {
      if (res.rowsAffected[0] > 0) {
        this.dialogRef.close()
        this.router.navigateByUrl('tickets/list')
      }
    })
  }

}
