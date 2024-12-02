import { Component } from '@angular/core';
import { FacturasServiceService } from '../../../services/facturas-service.service';
import { Factura } from '../../../models/facturaModel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cuenta-facturas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cuenta-facturas.component.html',
  styleUrl: './cuenta-facturas.component.css'
})
export class CuentaFacturasComponent {
  id = '';
  facturas: Factura[] = [];

  constructor(private facturaService: FacturasServiceService) {}

  ngOnInit(): void {
    const id = sessionStorage.getItem('User');
    if (id) {
      this.id = JSON.parse(id).id;
      this.getFacturaUsuario(this.id);
    }
  }

  getFacturaUsuario(id: string): void {
    this.facturaService.getFacturaUsuario(id);
    setTimeout(() => {
      this.facturas = this.facturaService.obtenerFacturas();
    }, 500);
  }

  getEstadoClass(estado: string) {
    switch (estado) {
      case 'aceptado':
        return 'estado-aceptado';  // Clase para verde claro
      case 'pendiente':
        return 'estado-pendiente'; // Clase para amarillo claro
      case 'rechazado':
        return 'estado-rechazado'; // Clase para rojo claro
      default:
        return '';
    }
  }


  descargarFactura(xmlContent: string): void {
    const blob = new Blob([xmlContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'factura.xml';  // Nombre del archivo descargado
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);  // Liberamos la URL después de descargar
  }
}
