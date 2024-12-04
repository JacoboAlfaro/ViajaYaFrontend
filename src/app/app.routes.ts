import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { VuelosComponent } from './components/vuelos/vuelos.component';
import { CuentaComponent } from './components/cuenta/cuenta.component';
import { VueloDetalleComponent } from './components/vuelo-detalle/vuelo-detalle.component';
import { HotelesComponent } from './components/hoteles/hoteles.component';
import { HotelDetalleComponent } from './components/hotel-detalle/hotel-detalle.component';
import { PaqueteComponent } from './components/paquete/paquete.component';
import { PaqueteDetalleComponent } from './components/paquete-detalle/paquete-detalle.component';
import { CarritoComponent } from './components/carrito/carrito.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'vuelos', component: VuelosComponent},
    { path: 'vuelo/:id', component: VueloDetalleComponent},
    { path: 'cuenta', component: CuentaComponent},
    {path: 'alojamientos', component: HotelesComponent},
    {path: 'paquetes', component: PaqueteComponent},
    {path: 'carrito', component: CarritoComponent},
    {path: 'paquetes/:id', component: PaqueteDetalleComponent},
    {path: 'alojamientos/:id', component: HotelDetalleComponent},
];
