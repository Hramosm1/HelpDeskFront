import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { createResponse, deleteResponse, updateResponse } from '../interfaces/http';
import { AuthRoutes } from './endpoints';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  base = environment.autenticacionuri
  constructor(private http: HttpClient) { }
  getAll<T>(route: AuthRoutes): Observable<T[]> {
    console.log(this.base + route)
    return this.http.get<T[]>(this.base + route)
  }
  getById<T>(route: AuthRoutes, id: number | string): Observable<T> {
    return this.http.get<T>(`${this.base}${route}/${id}`)
  }
  create<Body>(route: AuthRoutes, body: Body) {
    return this.http.post<createResponse>(this.base + route, body)
  }
  update<Body>(route: AuthRoutes, id: number | string, body: Body) {
    return this.http.put<updateResponse>(`${this.base}${route}/${id}`, body)
  }
  delete(route: AuthRoutes, id: number | string) {
    return this.http.delete<deleteResponse>(`${this.base}${route}/${id}`)
  }
}
