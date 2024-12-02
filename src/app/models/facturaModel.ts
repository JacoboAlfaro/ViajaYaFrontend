export class Factura {
    id: number = 0;
    fecha: Date = new Date();
    total: number = 0;
    metodoPago: string = '';
    estadoPago: string = '';
    xml: string = '';
    idReserva: number = 0;
}
