import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
	selector: 'app-base',
	templateUrl: './base.component.html',
	styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {
	@Input() title: string;
	@Input() subtitle: string;
	@Input() breadcrum: boolean = true;
	ruta: string[];

	constructor(private router: Router) {
	}

	ngOnInit(): void {
		this.ruta = this.router.url.split('/');
	}

	navegate(indice: number): string {
		return this.ruta.slice(0, indice + 1).join('/') || '/';
	}
}
