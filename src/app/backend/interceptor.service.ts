import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  constructor() { }
  mError(error: HttpErrorResponse) {
    console.log('sucedio un error');
    console.warn(error);

    return throwError('error personalizado')
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.info('paso el interceptor')
    return next.handle(req).pipe(catchError(this.mError))
  }
}
