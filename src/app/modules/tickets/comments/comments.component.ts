import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpService } from 'app/backend/services/http.service';
import { UserService } from 'app/core/user/user.service';
import { Observable, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() ticket: string
  subject$ = new Subject()
  comentarios$: Observable<any>
  comentario = new FormControl('', Validators.required)
  usuario: string
  constructor(private api: HttpService, private _user: UserService) { }

  ngOnInit(): void {
    this._user.user$.subscribe(u => this.usuario = u.id)
    this.comentarios$ = this.subject$
      .pipe(switchMap(() => this.api.getById<any[]>('comentarios', this.ticket)))
    this.comentarios$.subscribe(console.log)
  }
  ngAfterViewInit(): void {
    this.subject$.next(null)
  }
  ngOnDestroy(): void {
    this.subject$.complete()
  }
  submit() {
    const body = { ticket: this.ticket, comentario: this.comentario.value, usuario: this.usuario }
    this.api.create('comentarios', body).subscribe(res => {
      if (res.rowsAffected[0] > 0) {
        this.subject$.next(null)
        this.comentario.reset()
      }
    })
  }
  getColor(id: string) {
    return '#' + id.slice(-6)
  }
}