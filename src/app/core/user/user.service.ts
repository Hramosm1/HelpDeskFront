import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, pluck, ReplaySubject } from 'rxjs';
import { PermisosEspecial, User } from 'app/core/user/user.types';
import { groupBy, mapValues } from 'lodash';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private _user: ReplaySubject<User> = new ReplaySubject<User>(1);

    constructor(private _httpClient: HttpClient) { }


    set user(value: User) {
        // Store the value
        this._user.next(value);
    }


    get user$(): Observable<User> {
        return this._user.asObservable();
    }
    get permisos$() {
        return this.user$.pipe(pluck('permisos'), map(arr => mapValues(groupBy(arr, 'Modulos.nombre'), val => val[0])))
    }
    get permisosEspeciales$() {
        return this.user$.pipe(pluck('permisosEspeciales'))
    }
    get permisosEspecialesStr$() {
        return this.user$.
            pipe(pluck('permisosEspeciales'))
            .pipe(map<PermisosEspecial[], string[]>(val => val.reduce((prev, val) => (prev = [...prev, val.nombre.toLowerCase()]), [])))
    }



    // get(): Observable<User> {
    //     return this._httpClient.get<User>('api/common/user').pipe(
    //         tap((user) => {
    //             this._user.next(user);
    //         })
    //     );
    // }


    // update(user: User): Observable<any> {
    //     return this._httpClient.patch<User>('api/common/user', { user }).pipe(
    //         map((response) => {
    //             this._user.next(response);
    //         })
    //     );
    // }
}
