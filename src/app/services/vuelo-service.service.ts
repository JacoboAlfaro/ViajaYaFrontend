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


  constructor(private http: HttpClient,
              private commonService: CommonServiceService,
              private alertService: AlertServiceService) { }

  getVuelos(){
    this.commonService.getAll(`${this.vueloUrl}`).subscribe((res: any)=>{
      
      this.alertService.mostrarAlertaTipoToast('success', 'Vuelos obtenidos correctamente')
    })
  }
}
