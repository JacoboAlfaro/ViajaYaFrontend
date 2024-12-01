import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonServiceService } from './common-service.service';

@Injectable({
  providedIn: 'root'
})
export class ReservaServiceService {
  reserUrl = environment.apireservaUrl;
  headers = new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('AccessToken')}`);

  constructor(private http: HttpClient,
    private commonService: CommonServiceService,) { }

  getReservaUsuario(id: string) {
    this.commonService.getAll(`${this.reserUrl}/usuario/${id}`).subscribe(
      (res: any) => {
        console.log('Reserva obtenida:', res);
      },
      (error: any) => {
        console.error('Error obteniendo la reserva:', error);
      }
    );
  }
}
