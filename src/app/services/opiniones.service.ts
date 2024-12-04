import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { Resenia } from '../models/reseniaModel';
import { CommonServiceService } from './common-service.service';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class OpinionesService {
  ResenUrl = environment.apiReseniaUrl;
  resenias: Resenia[] = [];
  constructor(private commonService: CommonServiceService,
    private http: HttpClient,
  ) { }

  getReseniaUsuario(id: string) {
    this.commonService.getAll(`${this.ResenUrl}/usuario/${id}`).subscribe(
      (res: any) => {
        if (res.respuestaExitosa && res.data) {
          this.resenias = res.data; // Asignamos las resenias desde 'data'
        }
      },
      (error: any) => {
        console.error('Error obteniendo la resenia:', error);
      }
    );
  }

  obtenerResenias(): Resenia[] {
    return this.resenias;
  }



  getReseniaEspecifica(resenia: any, producto: Number){
    this.commonService.getAll(`${this.ResenUrl}/producto/${producto}/${resenia}`).subscribe(
      (res: any)=>{
        if(res.respuestaExitosa && res.data){
          this.resenias = res.data;
        }
      },
      (error: any)=>{
        console.error('Error obteniendo la resenia:', error);
      }
    );
  }

  obtenerReseniasPorProducto(): Resenia[] {
    return this.resenias;
  }


  postresenia(resenia: Resenia, idUser: number) {
    this.commonService.post(`${this.ResenUrl}`, resenia).subscribe(
      (res: any) => {
        if (res.respuestaExitosa && res.data) {
          this.resenias = res.data;
        }
      },
      (error: any) => {
        console.error('Error obteniendo la resenia:', error);
      }
    );
  }
}
