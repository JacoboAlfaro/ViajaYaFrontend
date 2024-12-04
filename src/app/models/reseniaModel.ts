import { Datauser } from "./datauserModel";

export class Resenia {
    id: number = 0;
    fecha: Date = new Date();
    calificacion: number = 0;
    comentario: string = '';
    idProducto: number = 0;
    idReferencia: number = 0;
    usuario: Datauser = new Datauser();
}
