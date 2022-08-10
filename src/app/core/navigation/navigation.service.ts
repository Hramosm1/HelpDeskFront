import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject, tap, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators'
import { Navigation } from 'app/core/navigation/navigation.types';
import { UserService } from '../user/user.service';

@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    private _navigation: ReplaySubject<Navigation> = new ReplaySubject<Navigation>(1);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient, private user: UserService) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for navigation
     */
    get navigation$(): Observable<Navigation> {
        const obs = combineLatest(this.user.permisos$, this._navigation.asObservable())
        return obs.pipe(map(([permisos, navegacion]) => {
            const newNavegacion: any = {}
            for (const key in navegacion) {
                if (Object.prototype.hasOwnProperty.call(navegacion, key)) {
                    const element: any[] = navegacion[key];
                    const nList = element.filter(url => permisos[url.id].ver)
                    newNavegacion[key] = nList
                }
            }
            return newNavegacion
        }))
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all navigation data
     */
    get(): Observable<Navigation> {
        return this._httpClient.get<Navigation>('api/common/navigation').pipe(
            tap((navigation) => {
                this._navigation.next(navigation);
            })
        );
    }
}
