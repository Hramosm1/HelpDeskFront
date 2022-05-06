import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'app/backend/services/http.service';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators'
@Component({
  selector: 'app-ticket-information',
  templateUrl: './ticket-information.component.html',
  styleUrls: ['./ticket-information.component.scss']
})
export class TicketInformationComponent implements OnInit {
  id$: Observable<string>
  ticket$: Observable<any>
  @ViewChild('descripcion') descripcion: ElementRef
  constructor(private ar: ActivatedRoute, private api: HttpService) { }

  ngOnInit(): void {
    this.id$ = this.ar.params.pipe(pluck('id'))
    this.id$.subscribe(val => this.ticket$ = this.api.getById('tickets', val))
  }

}
