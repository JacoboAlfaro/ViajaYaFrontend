import { Component } from '@angular/core';
import { ReservaServiceService } from '../../../services/reserva-service.service';
import { Reserva } from '../../../models/reservaModel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cuenta-reservas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cuenta-reservas.component.html',
  styleUrl: './cuenta-reservas.component.css'
})
export class CuentaReservasComponent {
  id = '';
  reservas: Reserva[] = [];

  constructor(private reserService: ReservaServiceService) {}

  ngOnInit(): void {
    const id = sessionStorage.getItem('User');
    if (id) {
      this.id = JSON.parse(id).id;
      this.getReservaUsuario(this.id);
    }
  }

  getReservaUsuario(id: string): void {
    this.reserService.getReservaUsuario(id);
    this.reservas = this.reserService.obtenerReservas(); // Obtener las reservas
  }
}
