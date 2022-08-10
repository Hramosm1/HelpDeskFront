import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { tap } from "rxjs/operators";
import { DashboardPath, Destino, Meses } from './endpoints';
import { TicketResult } from 'app/modules/mantenimientos/interfaces';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  base = environment.backenduri
  constructor(private http: HttpClient) { }

  getAll<T>(route: Destino): Observable<T[]> {
    return this.http.get<T[]>(this.base + route)
  }
  getById<T>(route: Destino, id: number | string): Observable<T> {
    return this.http.get<T>(`${this.base}${route}/${id}`)
  }
  create<Body>(route: Destino, body: Body) {
    return this.http.post<any>(this.base + route, body).pipe(catchError(this.handleError))
  }
  update<Body>(route: Destino, id: number | string, body: Body) {
    return this.http.put<any>(`${this.base}${route}/${id}`, body).pipe(catchError(this.handleError))
  }
  delete(route: Destino, id: number | string) {
    return this.http.delete<any>(`${this.base}${route}/${id}`).pipe(catchError(this.handleError))
  }
  getTickets(take: number, page: number, query?: any) {
    const params = new HttpParams({ fromObject: query })
    return this.http.get<TicketResult>(`${this.base}tickets/${take}/${page}`, { params })
  }
  getDashboard<T>(path: DashboardPath, mes?: Number) {
    return this.http.get<T>(`${this.base}dashboard/${path}/${mes}`).pipe(catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
