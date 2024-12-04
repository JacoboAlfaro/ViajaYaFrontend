import { ServcioAdicional } from "./servicioAdicionalModel";

export class Hotel {
  id: number = 0;
  nombreHotel: string = '';
  ciudad: string = '';
  pais: string = '';
  direccion: string = '';
  numEstrellas:  number = 0;
  tipoHabitacion: string = '';
  precioNoche: number = 0.0;
  serviciosAdicionales: ServcioAdicional[] = [];
}
