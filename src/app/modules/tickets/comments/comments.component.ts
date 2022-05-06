import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from 'app/backend/services/http.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input() ticket: string
  comentarios$: Observable<any>
  constructor(private api: HttpService) { }

  ngOnInit(): void {
    this.comentarios$ = this.api.getById<any[]>('comentarios', this.ticket)
  }

}
