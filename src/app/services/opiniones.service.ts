import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { Resenia } from '../models/reseniaModel';
import { CommonServiceService } from './common-service.service';

@Injectable({
  providedIn: 'root'
})
export class OpinionesService {
  ResenUrl = environment.apiReseniaUrl;
  resenias: Resenia[] = [];
  constructor(private commonService: CommonServiceService) { }

  getReseniaUsuario(id: string) {
    this.commonService.getAll(`${this.ResenUrl}/usuario/${id}`).subscribe(
      (res: any) => {
        console.log('Resenia obtenida:', res);
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
}
