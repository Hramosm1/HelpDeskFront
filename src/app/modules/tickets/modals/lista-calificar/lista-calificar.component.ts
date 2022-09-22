import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';

@Component({
	selector: 'app-lista-calificar',
	templateUrl: './lista-calificar.component.html',
	styleUrls: ['./lista-calificar.component.scss']
})
export class ListaCalificarComponent implements OnInit {

	constructor(
		public dialogRef: MatDialogRef<ListaCalificarComponent>,
		@Inject(MAT_DIALOG_DATA) public dat: Notification[],
		private router: Router
		) {

	}

	ngOnInit(): void {
		console.log('desde el dialog', this.dat);
	}
	redireccionar(uri: string){
		this.dialogRef.close();
		this.router.navigateByUrl(uri);
	}
}
