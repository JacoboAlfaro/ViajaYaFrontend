import { HotelService } from './../../services/hotel.service';
import { Component } from '@angular/core';
import { NavbarComponent } from "../../common/navbar/navbar.component";
import { OpinionesService } from '../../services/opiniones.service';
import { AlertServiceService } from '../../common/generalServices/alert-service.service';
import { ActivatedRoute } from '@angular/router';
import { Resenia } from '../../models/reseniaModel';
import { Hotel } from '../../models/hotelModel';
import { ALERTA_TIPO } from '../../common/conts/alerts/sweetAlertConsts';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hotel-detalle',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FormsModule],
  templateUrl: './hotel-detalle.component.html',
  styleUrl: './hotel-detalle.component.css'
})
export class HotelDetalleComponent {
  nuevoComentario: string = '';
  nuevaCalificacion: number = 1;
  stars: number[] = [1, 2, 3, 4, 5];
  idProducto: number = 1; //
  idReferencia: number = 2;
  idUsuario: number = 0;
  hotel: Hotel | null = null;
  resenias: Resenia[] = [];
  hotelId = this.route.snapshot.paramMap.get('id');
  producto = 2;

  constructor(
    private route: ActivatedRoute,
    private HotelService: HotelService,
    private opService: OpinionesService,
    private alertService: AlertServiceService,
  ) {}

  ngOnInit(): void {
    const user = sessionStorage.getItem('User');
    const userObj = user ? JSON.parse(user) : null;
    this.idUsuario = userObj?.id || 0;
    if (this.hotelId !== null) {
      this.obtenerDEtalleHotel(Number(this.hotelId));
      this.getReseniaEspecifica();
    }
  }

  seleccionarCalificacion(calificacion: number): void {
    this.nuevaCalificacion = calificacion; // Actualiza la calificación
  }

  obtenerDEtalleHotel(id: number): void {
    this.HotelService.obtenerHotel(id).subscribe(
      (hotel: Hotel) => {
        this.hotel = hotel;
      },
      (error: any) => {
        console.error('Error obteniendo el vuelo:', error);
      }
    );
  }


  guardar(producto: any, tipo: string): void {
    // Obtener el carrito actual de sessionStorage (si existe) para el tipo específico
    let carrito = sessionStorage.getItem(tipo);

    // Si ya hay productos de ese tipo en el carrito, los obtenemos
    if (carrito) {
      // Parseamos el carrito a un array de objetos
      let productos = JSON.parse(carrito);

      // Verificamos si el producto ya está en el carrito para evitar duplicados
      const existe = productos.find((productoEnCarrito: any) => productoEnCarrito.id === producto.id);

      if (!existe) {
        // Agregamos el producto al carrito
        productos.push(producto);
        sessionStorage.setItem(tipo, JSON.stringify(productos)); // Actualizamos el carrito en sessionStorage
        this.alertService.mostrarAlertaSimple(ALERTA_TIPO.OK, `El ${tipo} ha sido guardado en el carrito`);
      } else {
        this.alertService.mostrarAlertaSimple(ALERTA_TIPO.WARNING, `Este ${tipo} ya está en el carrito`);
      }
    } else {
      // Si no existe el carrito, creamos uno nuevo con el producto
      sessionStorage.setItem(tipo, JSON.stringify([producto]));
      this.alertService.mostrarAlertaSimple(ALERTA_TIPO.OK, `El ${tipo} ha sido guardado en el carrito`);
    }
  }




  getReseniaEspecifica(id = this.hotelId, producto = this.producto){
    this.opService.getReseniaEspecifica(id, producto);
    setTimeout(() => {
      this.resenias = this.opService.obtenerReseniasPorProducto();
    }, 500);
  }

  enviarResenia() {
    // Crear la reseña con los datos del formulario
    const nuevaResenia = {
      id: 0,
      calificacion: this.nuevaCalificacion,
      comentario: this.nuevoComentario,
      idProducto:   this.producto,
      idReferencia:  this.hotelId ? parseInt(this.hotelId) : 0,
      idUsuario: this.idUsuario
    };
    this.postResenia(nuevaResenia, this.idUsuario);
    this.nuevaCalificacion = 0;
    this.nuevoComentario = '';

  }

  postResenia(nuevaResenia: any, idUsuario: number) {
    this.opService.postresenia(nuevaResenia, this.idUsuario);
    setTimeout(() => {
      this.getReseniaEspecifica();
    }, 500);
  }

}
