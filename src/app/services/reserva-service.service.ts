import { AlertServiceService } from './../common/generalServices/alert-service.service';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonServiceService } from './common-service.service';
import { Reserva } from '../models/reservaModel';
import { ALERTA_TIPO } from '../common/conts/alerts/sweetAlertConsts';

@Injectable({
  providedIn: 'root'
})
export class ReservaServiceService {
  reserUrl = environment.apireservaUrl;
  reservas: Reserva[] = [];

  constructor(private http: HttpClient,
    private commonService: CommonServiceService,
    private AlertServiceService: AlertServiceService) { }

  getReservaUsuario(id: string) {
    this.commonService.getAll(`${this.reserUrl}/usuario/${id}`).subscribe(
      (res: any) => {
        console.log('Reserva obtenida:', res);
        if (res.respuestaExitosa && res.data) {
          this.reservas = res.data; // Asignamos las reservas desde 'data'
        }
      },
      (error: any) => {
        console.error('Error obteniendo la reserva:', error);
      }
    );
  }

  obtenerReservas(): Reserva[] {
    return this.reservas;
  }

  postReserva(reserva: any) {
    // Enviar la solicitud POST al backend
    this.commonService.post(`${this.reserUrl}`, reserva).subscribe(
      (res: any) => {
        if (res.respuestaExitosa && res.data) {
          this.reservas = res.data; // Si la reserva fue exitosa, actualizamos las reservas
        }
      },
      (error: any) => {
        console.error('Error obteniendo la reserva:', error);
      }
    );
  }
}


