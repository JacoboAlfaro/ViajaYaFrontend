import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  user: string = 'Iniciar Sesión';

  constructor() {}

  ngOnInit(): void {
    // Verificar que sessionStorage está disponible
    if (typeof window !== 'undefined' && sessionStorage) {
      const user = sessionStorage.getItem('User');
      this.user = user ?? 'Iniciar Sesión';
    } else {
      console.warn('sessionStorage no está disponible.');
    }
  }
}
