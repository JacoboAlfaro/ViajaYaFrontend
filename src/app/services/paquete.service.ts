import { Injectable } from '@angular/core';
import { Paquete } from '../models/paqueteModel';
import { environment } from '../environments/environments';
import { CommonServiceService } from './common-service.service';
import { AlertServiceService } from '../common/generalServices/alert-service.service';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaqueteService {
  private paqueteUrl = environment.apiPaqueteTuristicoUrl;
  paquete: Paquete[] = [];

  constructor(
    private commonService: CommonServiceService,
    private alertService: AlertServiceService,
    private http: HttpClient
  ) {}

  getPaquetes() {
    this.commonService.getAll(`${this.paqueteUrl}`).subscribe(
      (res: any) => {
        this.alertService.mostrarAlertaTipoToast(
          'success',
          'Paquetes obtenidos correctamente'
        );
        this.paquete = res.data;
        console.log('Paquetes obtenidos:', this.paquete);
      },
      (error: any) => {
        this.alertService.mostrarAlertaTipoToast(
          'error',
          'Error obteniendo los Paquetes'
        );
        console.error('Error obteniendo los Paquetes:', error);
      }
    );
  }

  obtenerPaquetes(): Paquete[] {
    return this.paquete;
  }

  obtenerPaquete(id: number): Observable<Paquete> {
    return this.http
      .get<{ data: Paquete }>(`${this.paqueteUrl}/${id}`)
      .pipe(map((response) => response.data));
  }

  getPaqueteByPrecio(preciomin: number, preciomax: number) {
    this.commonService
      .getAll(`${this.paqueteUrl}/porprecio/${preciomin}/${preciomax}`)
      .subscribe(
        (res: any) => {
          this.alertService.mostrarAlertaTipoToast(
            'success',
            'Paquete obtenido correctamente'
          );
          this.paquete = res.data;
          console.log('Paquete obtenido:', this.paquete);
        },
        (error: any) => {
          this.alertService.mostrarAlertaTipoToast(
            'error',
            'Error obteniendo el Paquetes'
          );
          console.error('Error obteniendo el Paquetes:', error);
        }
      );
  }

  getPaqueteByFecha(fecha: string) {
    this.commonService
      .getAll(`${this.paqueteUrl}/porfechasalida/${fecha}`)
      .subscribe(
        (res: any) => {
          this.alertService.mostrarAlertaTipoToast(
            'success',
            'Paquete obtenido correctamente'
          );
          this.paquete = res.data;
          console.log('Paquete obtenido:', this.paquete);
        },
        (error: any) => {
          this.alertService.mostrarAlertaTipoToast(
            'error',
            'Error obteniendo el Paquetes'
          );
          console.error('Error obteniendo el Paquetes:', error);
        }
      );
  }

  getPaqueteByFechaYPrecio(preciomin: number, preciomax: number, fecha: string) {
    this.commonService
      .getAll(
        `${this.paqueteUrl}/porprecioyfechasalida/${preciomin}/${preciomax}/${fecha}`
      )
      .subscribe(
        (res: any) => {
          this.alertService.mostrarAlertaTipoToast(
            'success',
            'Paquetes obtenido correctamente'
          );
          this.paquete = res.data;
          console.log('Paquetes obtenido:', this.paquete);
        },
        (error: any) => {
          this.alertService.mostrarAlertaTipoToast(
            'error',
            'Error obteniendo el Paquete'
          );
          console.error('Error obteniendo el Paquete:', error);
        }
      );
  }
}
