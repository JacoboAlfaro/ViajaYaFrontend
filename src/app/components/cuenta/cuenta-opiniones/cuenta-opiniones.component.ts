import { OpinionesService } from './../../../services/opiniones.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Resenia } from '../../../models/reseniaModel';

@Component({
  selector: 'app-cuenta-opiniones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cuenta-opiniones.component.html',
  styleUrl: './cuenta-opiniones.component.css'
})
export class CuentaOpinionesComponent {
   id = '';
  resenias: Resenia[] = [];

  constructor(private opService: OpinionesService){}

  ngOnInit(): void {
    const id = sessionStorage.getItem('User');
    if (id) {
      this.id = JSON.parse(id).id;
      this.getReseniaUsuario(this.id);
    }
  }


  getReseniaUsuario(id: string): void {
    this.opService.getReseniaUsuario(id);
    setTimeout(() => { // Espera a que las reseñas se carguen desde el servicio
      this.resenias = this.opService.obtenerResenias();
    }, 500);
  }

}
