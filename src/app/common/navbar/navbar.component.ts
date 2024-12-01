import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  user: {} = 'Iniciar Sesión';
  activeRoute: string = '';
  cuenta: boolean = false;
  constructor(private router : Router) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined' && sessionStorage) {
      const userData = sessionStorage.getItem('User');
      if (userData) {
        const user = JSON.parse(userData);
        this.user = user.nombre;
      }
    } else {
      console.warn('sessionStorage no está disponible.');
    }
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.activeRoute = event.urlAfterRedirects;
      }
    });
    if (this.user != 'Iniciar Sesión') {
      this.cuenta = true;
    }
  }
  isActive(route: string): boolean {
    return this.activeRoute === route;
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

}
