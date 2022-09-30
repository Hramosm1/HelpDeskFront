import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {environment} from "../../../../../environments/environment";

@Component({
	selector: 'app-lista-calificar',
	templateUrl: './lista-calificar.component.html',
	styleUrls: ['./lista-calificar.component.scss']
})
export class ListaCalificarComponent implements OnInit {
	base = environment.base;
	constructor(
		public dialogRef: MatDialogRef<ListaCalificarComponent>,
		@Inject(MAT_DIALOG_DATA) public dat: any[],
		private router: Router
		) {

	}

	ngOnInit(): void {
	}
	redireccionar(uri: string){
		this.dialogRef.close();
		this.router.navigateByUrl(uri);
	}
	getId(row:string):string{
		return row.split('No: ')[1]
	}
}
