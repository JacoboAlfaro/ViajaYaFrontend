import { CommonServiceService } from './common-service.service';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { Factura } from '../models/facturaModel';

@Injectable({
  providedIn: 'root'
})
export class FacturasServiceService {
  factUrl = environment.apiFacturaUrl;
  factura: Factura[] = [];

  constructor(private commonService: CommonServiceService){}

  getFacturaUsuario(id: string) {
    this.commonService.getAll(`${this.factUrl}/usuario/${id}`).subscribe(
      (res: any) => {
        console.log('Factura obtenida:', res);
        if (res.respuestaExitosa && res.data) {
          this.factura = res.data; // Asignamos las facturas desde 'data'
        }
      },
      (error: any) => {
        console.error('Error obteniendo la factura:', error);
      }
    );
  }

  obtenerFacturas(): Factura[] {
    return this.factura;
  }
}
