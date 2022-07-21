import { Component, OnInit } from '@angular/core';
import { SocketsService } from './shared/services/sockets.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    /**
     * Constructor
     */
    constructor(private socket: SocketsService) {
    }
}
