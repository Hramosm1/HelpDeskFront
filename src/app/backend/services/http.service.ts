import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { createResponse, deleteResponse, updateResponse } from '../interfaces/http';
import { Destino } from './endpoints';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  base = environment.urlBase
  constructor(private http: HttpClient) { }

  getAll<T>(route: Destino): Observable<T[]> {
    return this.http.get<T[]>(this.base + route)
  }
  getById<T>(route: Destino, id: number | string): Observable<T> {
    return this.http.get<T>(`${this.base}${route}/${id}`)
  }
  create<Body>(route: Destino, body: Body) {
    return this.http.post<createResponse>(this.base + route, body)
  }
  update<Body>(route: Destino, id: number | string, body: Body) {
    return this.http.put<updateResponse>(`${this.base}${route}/${id}`, body)
  }
  delete(route: Destino, id: number | string) {
    return this.http.delete<deleteResponse>(`${this.base}${route}/${id}`)
  }
}
