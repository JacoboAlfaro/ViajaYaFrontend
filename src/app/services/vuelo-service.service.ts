import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonServiceService } from './common-service.service';
import { environment } from '../environments/environments';
import { Vuelo } from '../models/vueloModel';
import { AlertServiceService } from '../common/generalServices/alert-service.service';

@Injectable({
  providedIn: 'root'
})
export class VueloServiceService {
  private vueloUrl = environment.apivueloUrl;
  vuelo: Vuelo[] = [];


  constructor(
              private commonService: CommonServiceService,
              private alertService: AlertServiceService) { }

  getVuelos(){
    this.commonService.getAll(`${this.vueloUrl}`).subscribe((res: any)=>{
      this.alertService.mostrarAlertaTipoToast('success', 'Vuelos obtenidos correctamente');
      this.vuelo = res.data;
      console.log('Vuelos obtenidos:', this.vuelo);
    },
    (error: any) => {
      this.alertService.mostrarAlertaTipoToast('error', 'Error obteniendo los vuelos');
      console.error('Error obteniendo los vuelos:', error);
    }
    );
  }

  obtenerVuelos(): Vuelo[] {
    return this.vuelo;
  }


  getVuelo(id: number){
    this.commonService.getById(this.vueloUrl, id).subscribe((res: any)=>{
      this.alertService.mostrarAlertaTipoToast('success', 'Vuelo obtenido correctamente');
      this.vuelo = res;
      console.log('Vuelo obtenido:', this.vuelo);
    },
    (error: any) => {
      this.alertService.mostrarAlertaTipoToast('error', 'Error obteniendo el vuelo');
      console.error('Error obteniendo el vuelo:', error);
    }
    );
  }

  getVueloByPrecio(preciomin: number, preciomax: number){
    this.commonService.getAll(`${this.vueloUrl}/porprecio/${preciomin}/${preciomax}`).subscribe((res: any)=>{
      this.alertService.mostrarAlertaTipoToast('success', 'Vuelo obtenido correctamente');
      this.vuelo = res.data;
      console.log('Vuelo obtenido:', this.vuelo);
    },
    (error: any) => {
      this.alertService.mostrarAlertaTipoToast('error', 'Error obteniendo el vuelo');
      console.error('Error obteniendo el vuelo:', error);
    }
    );
  }

  getVueloByFecha(fecha: string){
    this.commonService.getAll(`${this.vueloUrl}/porfechahorasalida/${fecha}`).subscribe((res: any)=>{
      this.alertService.mostrarAlertaTipoToast('success', 'Vuelo obtenido correctamente');
      this.vuelo = res.data;
      console.log('Vuelo obtenido:', this.vuelo);
    },
    (error: any) => {
      this.alertService.mostrarAlertaTipoToast('error', 'Error obteniendo el vuelo');
      console.error('Error obteniendo el vuelo:', error);
    }
    );
  }

  getVueloByFechaYPrecio(preciomin: number, preciomax: number, fecha: string){
    this.commonService.getAll(`${this.vueloUrl}/porprecioyfechahorasalida/${fecha}/${preciomin}/${preciomax}`).subscribe((res: any)=>{
      this.alertService.mostrarAlertaTipoToast('success', 'Vuelo obtenido correctamente');
      this.vuelo = res.data;
      console.log('Vuelo obtenido:', this.vuelo);
    },
    (error: any) => {
      this.alertService.mostrarAlertaTipoToast('error', 'Error obteniendo el vuelo');
      console.error('Error obteniendo el vuelo:', error);
    }
    );
  }



}
