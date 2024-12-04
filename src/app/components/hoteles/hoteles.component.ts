import { Component } from '@angular/core';
import { NavbarComponent } from "../../common/navbar/navbar.component";
import { HotelService } from '../../services/hotel.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Hotel } from '../../models/hotelModel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hoteles',
  standalone: true,
  imports: [NavbarComponent, FormsModule, CommonModule],
  templateUrl: './hoteles.component.html',
  styleUrl: './hoteles.component.css'
})
export class HotelesComponent {
  hoteles: Hotel[] = []; // Lista de hoteles obtenidos
  precioMin: number = 0; // Precio mínimo para el filtro
  precioMax: number = 100; // Precio máximo para el filtro
  ciudad: string = ''; // Ciudad para el filtro

  constructor(private hotelService: HotelService,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    const id = sessionStorage.getItem('User');
    if (id) {
      this.getHoteles();
    }
  }

  getHoteles(): void {
    this.hotelService.getHoteles();
    setTimeout(() => {
      this.hoteles = this.hotelService.obtenerHoteles();
    }, 500);
  }

  // Obtener detalles de un hotel específico
  getHotel(id: number): void {
    this.router.navigate(['/alojamientos', id]); // Navega a la ruta con el ID del hotel
  }

  buscarPorFiltros(): void {
    const tieneCiudad = this.ciudad.trim().length > 0; // Verifica si se ha ingresado una ciudad
    const tienePrecioMin = this.precioMin !== null && this.precioMin >= 0; // Acepta 0 como válido
    const tienePrecioMax = this.precioMax !== null && this.precioMax > 0; // Debe ser mayor a 0

    if (tieneCiudad && tienePrecioMin && tienePrecioMax) {
      // Filtro por ciudad y rango de precios
      this.hotelService.getHotelesPorCiudadYPrecio(this.precioMin, this.precioMax, this.ciudad);
    } else if (tieneCiudad) {
      // Filtro solo por ciudad
      this.hotelService.getHotelesPorCiudad(this.ciudad);
    } else if (tienePrecioMin && tienePrecioMax) {
      // Filtro solo por rango de precios
      this.hotelService.getHotelesPorPrecio(this.precioMin, this.precioMax);
    } else {
      // Si no hay filtros válidos, cargar todos los hoteles
      this.getHoteles();
    }

    // Actualizar la lista de hoteles después de aplicar filtros
    setTimeout(() => {
      this.hoteles = this.hotelService.obtenerHoteles();
    }, 500);
  }

}
