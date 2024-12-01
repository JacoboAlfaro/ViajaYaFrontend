import { Component } from '@angular/core';
import { ReservaServiceService } from '../../../services/reserva-service.service';

@Component({
  selector: 'app-cuenta-reservas',
  standalone: true,
  imports: [],
  templateUrl: './cuenta-reservas.component.html',
  styleUrl: './cuenta-reservas.component.css'
})
export class CuentaReservasComponent {
  id = '';

  constructor(private reserService: ReservaServiceService,) {
  }

  ngOnInit(): void {
    const id = sessionStorage.getItem('User');
    if (id) {
      this.id = JSON.parse(id).id;
    }
    this.getReservaUsuario(this.id);
  }

  getReservaUsuario(id: string){
    this.reserService.getReservaUsuario(this.id);
  }
}
