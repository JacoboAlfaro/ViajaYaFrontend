import { CLASE_SERVICIO } from "../common/conts/enums/claseServicio";
import { ServcioAdicional } from "./servicioAdicionalModel";


export class Vuelo {
    id: number = 0;
    numVuelo: string = '';
    aerolinea: string = '';
    origen: string = '';
    destino: string = '';
    fechaHoraSalida: Date = new Date();
    numEscalas: number = 0;
    modeloAvion: string = '';
    precio: number = 0.0;
    claseServicio: CLASE_SERVICIO = CLASE_SERVICIO.economica;
    equipaje: boolean = false;
    serviciosAdicionales: ServcioAdicional[] = [];
}