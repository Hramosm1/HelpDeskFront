import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpService } from 'app/backend/services/http.service';
import { quillConfig } from 'app/core/config/quill.config';
import { UserService } from 'app/core/user/user.service';
import { SocketsService } from 'app/shared/services/sockets.service';
import { QuillEditorComponent } from 'ngx-quill';
import { Observable, Subject, Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(QuillEditorComponent, { static: true }) editor: QuillEditorComponent;
  @Input() ticket: string;
  subject$ = new Subject();
  comentarios$: Observable<any>;
  comentario = new FormControl('', Validators.required);
  usuario: string;
  subs: Subscription;
  constructor(private api: HttpService, private _user: UserService, private socket: SocketsService) { }


  ngOnInit(): void {
    this.editor.modules = quillConfig.modules;
    this._user.user$.subscribe(u => this.usuario = u.id);
    this.comentarios$ = this.subject$
      .pipe(switchMap(() => this.api.getById<any[]>('comentarios', this.ticket)));
  }
  ngAfterViewInit(): void {
    this.subject$.next(null);
    this.subs = this.socket.nuevoComentario$.subscribe(_ => this.subject$.next(null));
  }
  ngOnDestroy(): void {
    this.subject$.complete();
    this.subs.unsubscribe();
  }
  submit() {
    const body = { idTicket: Number(this.ticket), comentario: this.comentario.value, idUsuario: this.usuario };
    this.api.create('comentarios', body).subscribe((res) => {
      this.subject$.next(null);
      this.comentario.reset();
    });
  }
  getColor(id: string) {
    return '#' + id.slice(-6);
  }
}
