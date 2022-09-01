export interface Prioridades {
	id: number;
	nombre: string;
	color: string;
	activo: boolean;
}

export interface Estados {
	id: number;
	nombre: string;
	activo: boolean;
	inmutable: boolean;
}

export interface NombreSolicitante {
	id: string;
	nombre: string;
}

export interface TicketInfo {
	id: number;
	titulo: string;
	descripcion: string;
	solicitudDe: string;
	asignadoA?: any;
	idPrioridad: number;
	idEstado: number;
	fechaSolicitud: Date;
	activo: boolean;
	Calificacion: number;
	PersonalDeSoporte?: any;
	Prioridades: Prioridades;
	Estados: Estados;
	nombreSolicitante: NombreSolicitante[];
}
