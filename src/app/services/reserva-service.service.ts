import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonServiceService } from './common-service.service';
import { Reserva } from '../models/reservaModel';

@Injectable({
  providedIn: 'root'
})
export class ReservaServiceService {
  reserUrl = environment.apireservaUrl;
  // headers = new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('AccessToken')}`);
  reservas: Reserva[] = [];

  constructor(private http: HttpClient,
    private commonService: CommonServiceService,) { }

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

}
