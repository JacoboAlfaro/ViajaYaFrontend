import { Injectable } from '@angular/core';
import { Hotel } from '../models/hotelModel';
import { environment } from '../environments/environments';
import { CommonServiceService } from './common-service.service';
import { AlertServiceService } from '../common/generalServices/alert-service.service';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private hotelUrl = environment.apihotelUrl;
  hoteles: Hotel[] = [];
  hotelSeleccionado: Hotel = new Hotel();

  constructor(
    private commonService: CommonServiceService,
    private alertService: AlertServiceService,
    private http: HttpClient
  ) {}

  // Obtener todos los hoteles
  getHoteles() {
    this.commonService.getAll(`${this.hotelUrl}`).subscribe(
      (res: any) => {
        this.alertService.mostrarAlertaTipoToast('success', 'Alojamientos obtenidos correctamente');
        this.hoteles = res.data;
        console.log('Hoteles obtenidos:', this.hoteles);
      },
      (error: any) => {
        this.alertService.mostrarAlertaTipoToast('error', 'Error obteniendo los hoteles');
        console.error('Error obteniendo los hoteles:', error);
      }
    );
  }

  obtenerHoteles(): Hotel[] {
    return this.hoteles;
  }

  // Obtener un hotel específico
  obtenerHotel(id: number): Observable<Hotel> {
    return this.http.get<{ data: Hotel }>(`${this.hotelUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }

  // Buscar hoteles por rango de precio
  getHotelesPorPrecio(preciomin: number, preciomax: number) {
    this.commonService.getAll(`${this.hotelUrl}/porprecio/${preciomin}/${preciomax}`).subscribe(
      (res: any) => {
        this.alertService.mostrarAlertaTipoToast('success', 'Alojamientos obtenidos correctamente');
        this.hoteles = res.data;
        console.log('Hoteles obtenidos:', this.hoteles);
      },
      (error: any) => {
        this.alertService.mostrarAlertaTipoToast('error', 'Error obteniendo los hoteles');
        console.error('Error obteniendo los hoteles:', error);
      }
    );
  }

  // Buscar hoteles por fecha
  getHotelesPorCiudad(ciudad: string) {
    this.commonService.getAll(`${this.hotelUrl}/porciudad/${ciudad}`).subscribe(
      (res: any) => {
        this.alertService.mostrarAlertaTipoToast('success', 'Alojamientos obtenidos correctamente');
        this.hoteles = res.data;
        console.log('Hoteles obtenidos:', this.hoteles);
      },
      (error: any) => {
        this.alertService.mostrarAlertaTipoToast('error', 'Error obteniendo los hoteles');
        console.error('Error obteniendo los hoteles:', error);
      }
    );
  }

  // Buscar hoteles por precio y fecha
  getHotelesPorCiudadYPrecio(preciomin: number, preciomax: number, ciudad: string) {
    this.commonService.getAll(`${this.hotelUrl}/porciudadyprecio/${ciudad}/${preciomin}/${preciomax}`).subscribe(
      (res: any) => {
        this.alertService.mostrarAlertaTipoToast('success', 'Alojamientos obtenidos correctamente');
        this.hoteles = res.data;
        console.log('Hoteles obtenidos:', this.hoteles);
      },
      (error: any) => {
        this.alertService.mostrarAlertaTipoToast('error', 'Error obteniendo los hoteles');
        console.error('Error obteniendo los hoteles:', error);
      }
    );
  }
}
