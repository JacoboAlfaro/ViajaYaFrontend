
import { Component } from '@angular/core';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { VueloServiceService } from '../../services/vuelo-service.service';
import { CommonModule } from '@angular/common';
import { Vuelo } from '../../models/vueloModel';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vuelos',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FormsModule],
  templateUrl: './vuelos.component.html',
  styleUrl: './vuelos.component.css'
})
export class VuelosComponent {
  vuelos: Vuelo[] = [];
  precioMin: number = 0;
  precioMax: number = 100;
  fechaDesde: string = '';

  constructor(private vueloService: VueloServiceService,
              private roter: Router
  ) {
  }

  ngOnInit(): void {
    const id = sessionStorage.getItem('User');
    if (id) {
      this.getVuelos();
    }
  }

  getVuelos() {
    this.vueloService.getVuelos();
    setTimeout(() => {
      this.vuelos = this.vueloService.obtenerVuelos();
    }
    , 500);
  }

  getVuelo(id: number): void {
    this.roter.navigate(['/vuelo', id]);  // Navega a la ruta con el ID del vuelo
  }

  convertirFechaConHora(fecha: string): string {
    console.log('Fecha recibida:', fecha);
    if (fecha == '') {
      return '';
    }else{
    const fechaConvertida = new Date(fecha);
    fechaConvertida.setDate(fechaConvertida.getDate() + 1);
    fechaConvertida.setHours(0, 0, 0, 0);
    return fechaConvertida.toISOString().split('T')[0] + "T00:00:00";
    }
  }



  buscarPorFiltros(): void {
    const fechaDesdeConHora = this.convertirFechaConHora(this.fechaDesde);

    const tieneFecha = this.fechaDesde.trim().length > 0; // Verifica si hay una fecha válida
    const tienePrecioMin = this.precioMin !== null && this.precioMin >= 0; // Acepta 0 como válido
    const tienePrecioMax = this.precioMax !== null && this.precioMax > 0; // Debe ser mayor a 0

    if (tieneFecha && tienePrecioMin && tienePrecioMax) {
      // Filtro por fecha y precio
      this.vueloService.getVueloByFechaYPrecio(this.precioMin, this.precioMax, fechaDesdeConHora);
    } else if (tienePrecioMin && tienePrecioMax) {
      // Filtro solo por rango de precios
      this.vueloService.getVueloByPrecio(this.precioMin, this.precioMax);
    } else if (tieneFecha) {
      // Filtro solo por fecha
      this.vueloService.getVueloByFecha(fechaDesdeConHora);
    } else {
      // Si no hay filtros, cargar todos los vuelos
      this.vueloService.getVuelos();
    }

    // Actualizar la lista de vuelos después de aplicar filtros
    setTimeout(() => {
      this.vuelos = this.vueloService.obtenerVuelos();
    }, 500);
  }




}
