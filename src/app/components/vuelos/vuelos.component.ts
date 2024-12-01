import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../common/navbar/navbar.component';

@Component({
  selector: 'app-vuelos',
  standalone: true,
  imports: [HttpClientModule,NavbarComponent],
  templateUrl: './vuelos.component.html',
  styleUrl: './vuelos.component.css'
})
export class VuelosComponent {


}
