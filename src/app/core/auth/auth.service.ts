import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, of, switchMap, throwError} from 'rxjs';
import {AuthUtils} from 'app/core/auth/auth.utils';
import {UserService} from 'app/core/user/user.service';
import {environment} from 'environments/environment';
import {SwPush} from '@angular/service-worker';

interface SignUpParams {
	user: { name: string; email: string; password: string; company: string };
}

@Injectable()
export class AuthService {
	private _authenticated: boolean = false;

	constructor(private _httpClient: HttpClient,
							private _userService: UserService,
							private swPush: SwPush,
							private user: UserService) {
	}

	get accessToken(): string {
		return localStorage.getItem('accessToken') ?? '';
	}

	set accessToken(token: string) {
		localStorage.setItem('accessToken', token);
	}


	forgotPassword(email: string): Observable<any> {
		return this._httpClient.post('api/auth/forgot-password', email);
	}

	resetPassword(password: string): Observable<any> {
		return this._httpClient.post('api/auth/reset-password', password);
	}

	signIn(credentials: { user: string; password: string; rememberMe: boolean; aplicacion: number }): Observable<any> {
		// Throw error, if the user is already logged in
		if (this._authenticated) {
			return throwError('User is already logged in.');
		}

		return this._httpClient.post(environment.autenticacionuri + 'login/10h', credentials).pipe(
			switchMap((response: any) => {

				// Store the access token in the local storage
				this.accessToken = response.accessToken;

				// Set the authenticated flag to true
				this._authenticated = true;

				// Store the user on the user service
				this._userService.user = response.user;

				//validate push notifications
				//this.checkPushNotifications();

				// Return a new observable with the response
				return of(response);
			})
		);
	}


	signInUsingToken(): Observable<any> {
		// Renew token
		const headers: HttpHeaders = new HttpHeaders();
		headers.set('Authorization', `Bearer ${this.accessToken}`);
		headers.set('Content-Type', 'application/json');
		return this._httpClient.get(environment.autenticacionuri + 'login/verifytoken', {headers}).pipe(
			catchError(() =>
				// Return false
				of(false)
			),
			switchMap((response: any) => {
				// Store the access token in the local storage
				this.accessToken = response.accessToken;

				// Set the authenticated flag to true
				this._authenticated = true;

				// Store the user on the user service
				this._userService.user = response.user;

				//validate push notifications
				//this.checkPushNotifications();
				// Return true
				return of(true);
			})
		);
	}


	signOut(): Observable<any> {
		// Remove the access token from the local storage
		localStorage.removeItem('accessToken');

		// Set the authenticated flag to false
		this._authenticated = false;

		// Return the observable
		return of(true);
	}

	signUp({user}: SignUpParams): Observable<any> {
		return this._httpClient.post('api/auth/sign-up', user);
	}

	unlockSession(credentials: { email: string; password: string }): Observable<any> {
		return this._httpClient.post('api/auth/unlock-session', credentials);
	}

	check(): Observable<boolean> {
		// Check if the user is logged in
		if (this._authenticated) {
			return of(true);
		}

		// Check the access token availability
		if (!this.accessToken || this.accessToken === 'undefined') {
			this.signOut();
		}

		// Check the access token expire date
		if (AuthUtils.isTokenExpired(this.accessToken)) {
			return of(false);
		}

		// If the access token exists and it didn't expire, sign in using it
		return this.signInUsingToken();
	}

	private checkPushNotifications(): void {
		if (!this.swPush.isEnabled) {
			this.swPush
				.requestSubscription({
					serverPublicKey: environment.publicKey
				})
				.then((result) => {
					this.user.user$.subscribe(val => console.log({val, permisos: JSON.stringify(result)}));
				});
		}
	}
}
