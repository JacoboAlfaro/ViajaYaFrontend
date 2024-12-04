import { ServcioAdicional } from "./servicioAdicionalModel";

export class Paquete {
  id: number = 0;
  nombrePaquete: string = '';
  destino: string = '';
  precio: string = '';
  serviciosIncluidos: string = '';
  fechaSalida: string = '';
  idVuelo: number = 0;
  idHotel: number = 0;
  serviciosAdicionales: ServcioAdicional[] = [];
}
