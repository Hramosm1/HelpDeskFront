import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketsService {
  notificacion$: Observable<any> = this.createObserver('notificacion');
  nuevoTicket$: Observable<any> = this.createObserver('nuevoTicket');
  nuevoComentario$: Observable<any> = this.createObserver('nuevoComentario');
  constructor(private socket: Socket) {
  }
  private createObserver(event: string) {
    return new Observable((observer) => {
      try {
        this.socket.on(event, (data) => { observer.next(data); });
        this.socket.on('error', (e) => { observer.error(e); });
      } catch (error) {
        observer.error(error);
      }
    });
  }
}
