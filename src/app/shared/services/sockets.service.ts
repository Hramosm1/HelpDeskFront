import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketsService {
  nuevoTicket$: Observable<any> = this.getEvents$()
  nuevoComentario$: Observable<any> = this.getComentarios()
  constructor(private socket: Socket) {
  }
  private getComentarios() {
    return new Observable(observer => {
      try {
        this.socket.on('nuevoComentario', (data) => { observer.next(data) })
        this.socket.on('error', (e) => { observer.error(e) })
        this.socket.on('disconnect', () => { observer.next() })
      } catch (error) {
        observer.error(error)
      }
    })
  }
  private getEvents$() {
    return new Observable(observer => {
      try {
        this.socket.on('nuevoTicket', (data) => { observer.next(data) })
        this.socket.on('error', (e) => { observer.error(e) })
        this.socket.on('disconnect', () => { observer.next() })
      } catch (error) {
        observer.error(error)
      }
    })
  }
}
