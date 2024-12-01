export class Reserva {
  id: number = 0
  idUsuario: number = 0
  confirmada: boolean = false // admin confirmó la reserva 1 = confirmada, 0 = no confirmada
  detalleReserva: string = '';
  estado: boolean = false; // 1 = En curso, 0 = finalizada
  fechaReserva: Date = new Date();
  hoteles: Array<any> = [];
  paquetes: Array<any> = [];
  vuelos: Array<any> = [];
  facturas: any = null;
}
