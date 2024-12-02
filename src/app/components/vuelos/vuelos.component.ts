import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { VueloServiceService } from '../../services/vuelo-service.service';
import { CommonModule } from '@angular/common';
import { Vuelo } from '../../models/vueloModel';
import { FormsModule } from '@angular/forms';
import e from 'express';

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

  constructor(private vueloService: VueloServiceService) {
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

  getVuelo(id: number) {
    this.vueloService.getVuelo(id);
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
    if (this.fechaDesde != '' && this.precioMax && this.precioMin) {
      this.vueloService.getVueloByFechaYPrecio(this.precioMin, this.precioMax, fechaDesdeConHora);
    } else if (this.precioMin && this.precioMax) {
      this.vueloService.getVueloByPrecio(this.precioMin, this.precioMax);
    }else if (this.fechaDesde != '') {
      this.vueloService.getVueloByFecha(fechaDesdeConHora);
    }else{
      this.vueloService.getVuelos();
    }

    // Obtener los vuelos filtrados después de la búsqueda
    setTimeout(() => {
      this.vuelos = this.vueloService.obtenerVuelos();
    }, 500);
  }



}
