import { Component } from '@angular/core';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { Datauser } from '../../models/datauserModel';
import { CommonModule } from '@angular/common';
import { CuentaOpinionesComponent } from "./cuenta-opiniones/cuenta-opiniones.component";
import { CuentaReservasComponent } from "./cuenta-reservas/cuenta-reservas.component";
import { CuentaFacturasComponent } from "./cuenta-facturas/cuenta-facturas.component";

@Component({
  selector: 'app-cuenta',
  standalone: true,
  imports: [NavbarComponent, CommonModule, CuentaOpinionesComponent, CuentaReservasComponent, CuentaFacturasComponent],
  templateUrl: './cuenta.component.html',
  styleUrl: './cuenta.component.css'
})
export class CuentaComponent {
   dataUser: Datauser = new Datauser;
   currentSection: string = 'datosPersonales';

  constructor(private router: Router,
              private authservice: AuthServiceService,  ) {
  }

  ngOnInit(): void {
    const userData = sessionStorage.getItem('User');
      if (userData) {
        const user = JSON.parse(userData);
        this.dataUser = user;
      }
  }


  showSection(section: string): void {
    this.currentSection = section; // Actualiza la sección actual
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  logout() {
    this.authservice.logout();
    this.navigateTo('/login');
  }
}
