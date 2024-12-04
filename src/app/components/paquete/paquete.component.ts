import { Component } from '@angular/core';
import { NavbarComponent } from "../../common/navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { Paquete } from '../../models/paqueteModel';
import { PaqueteService } from '../../services/paquete.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-paquete',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FormsModule],
  templateUrl: './paquete.component.html',
  styleUrl: './paquete.component.css'
})
export class PaqueteComponent {
  paquetes: Paquete[] = []; // Lista de hoteles obtenidos
  precioMin: number = 0; // Precio mínimo para el filtro
  precioMax: number = 100; // Precio máximo para el filtro
  fechaDesde: string = ''; // Ciudad para el filtro

  constructor(private paqueteService: PaqueteService,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    const id = sessionStorage.getItem('User');
    if (id) {
      this.getPaquetes();
    }
  }

  getPaquetes(): void {
    this.paqueteService.getPaquetes();
    setTimeout(() => {
      this.paquetes = this.paqueteService.obtenerPaquetes();
    }, 500);
  }

  // Obtener detalles de un hotel específico
  getPaquete(id: number): void {
    this.router.navigate(['/paquetes', id]); // Navega a la ruta con el ID del hotel
  }

  buscarPorFiltros(): void {

    const tieneFecha = this.fechaDesde.trim().length > 0; // Verifica si hay una fecha válida
    const tienePrecioMin = this.precioMin !== null && this.precioMin >= 0; // Acepta 0 como válido
    const tienePrecioMax = this.precioMax !== null && this.precioMax > 0; // Debe ser mayor a 0

    if (tieneFecha && tienePrecioMin && tienePrecioMax) {
      // Filtro por fecha y precio
      this.paqueteService.getPaqueteByFechaYPrecio(this.precioMin, this.precioMax, this.fechaDesde);
    } else if (tienePrecioMin && tienePrecioMax) {
      // Filtro solo por rango de precios
      this.paqueteService.getPaqueteByPrecio(this.precioMin, this.precioMax);
    } else if (tieneFecha) {
      // Filtro solo por fecha
      this.paqueteService.getPaqueteByFecha(this.fechaDesde);
    } else {
      // Si no hay filtros, cargar todos los vuelos
      this.paqueteService.getPaquetes();
    }

    // Actualizar la lista de vuelos después de aplicar filtros
    setTimeout(() => {
      this.paquetes = this.paqueteService.obtenerPaquetes();
    }, 500);
  }

}
