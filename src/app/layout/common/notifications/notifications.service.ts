import {Injectable} from '@angular/core';
import {Observable, pluck, ReplaySubject} from 'rxjs';
import {Notification} from 'app/layout/common/notifications/notifications.types';
import {HttpService} from 'app/backend/services/http.service';
import {UserService} from 'app/core/user/user.service';
import {SocketsService} from 'app/shared/services/sockets.service';

@Injectable({
	providedIn: 'root'
})
export class NotificationsService {
	private _notifications: ReplaySubject<Notification[]> = new ReplaySubject<Notification[]>(1);
	private idUser: string;

	/**
	 * Constructor
	 */
	constructor(private api: HttpService, private user: UserService, private socket: SocketsService) {
		user.user$.pipe(pluck('id')).subscribe(x => this.idUser = x);
		socket.notificacion$.subscribe(() => this.getAll());
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Accessors
	// -----------------------------------------------------------------------------------------------------

	/**
	 * Getter for notifications
	 */
	get notifications$(): Observable<Notification[]> {
		return this._notifications.asObservable();
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Public methods
	// -----------------------------------------------------------------------------------------------------

	/**
	 * Get all notifications
	 */
	getAll(): void {
		this.api.getById<Notification[]>('notificaciones/list', this.idUser)
			.subscribe(notifications => this._notifications.next(notifications));
	}


	/* create(notification: Notification): Observable<Notification> {
			 return this.notifications$.pipe(
					 take(1),
					 switchMap(notifications => this._httpClient.post<Notification>('api/common/notifications', { notification }).pipe(
							 map((newNotification) => {

									 // Update the notifications with the new notification
									 this._notifications.next([...notifications, newNotification]);

									 // Return the new notification from observable
									 return newNotification;
							 })
					 ))
			 );
	 }*/


	update(id: string): void {
		this.api.update('notificaciones/vista', id, null)
			.subscribe(() => this.getAll());
	}


	delete(id: string): void {
		this.api.delete('notificaciones', id)
			.subscribe(() => this.getAll());
	}

	/**
	 * Mark all notifications as read
	 */
	markAllAsRead(): void {
		this.api.update('notificaciones/vistas', this.idUser, null)
			.subscribe(() => this.getAll());
	}
}
