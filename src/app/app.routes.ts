import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { VuelosComponent } from './components/vuelos/vuelos.component';
import { CuentaComponent } from './components/cuenta/cuenta.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'vuelos', component: VuelosComponent},
    { path: 'cuenta', component: CuentaComponent},
];
