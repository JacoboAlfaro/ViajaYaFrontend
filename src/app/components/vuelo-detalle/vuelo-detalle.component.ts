import { provideClientHydration } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VueloServiceService } from '../../services/vuelo-service.service';
import { Vuelo } from '../../models/vueloModel';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { OpinionesService } from '../../services/opiniones.service';
import { Resenia } from '../../models/reseniaModel';
import { FormsModule } from '@angular/forms';
import { AlertServiceService } from '../../common/generalServices/alert-service.service';
import { ALERTA_TIPO } from '../../common/conts/alerts/sweetAlertConsts';

@Component({
  selector: 'app-vuelo-detalle',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FormsModule],
  templateUrl: './vuelo-detalle.component.html',
  styleUrl: './vuelo-detalle.component.css'
})
export class VueloDetalleComponent {
  nuevoComentario: string = '';
  nuevaCalificacion: number = 1;
  stars: number[] = [1, 2, 3, 4, 5];
  idProducto: number = 1; //
  idReferencia: number = 1;
  idUsuario: number = 0;
  vuelo: Vuelo | null = null;
  resenias: Resenia[] = [];
  vueloId = this.route.snapshot.paramMap.get('id');
  producto = 1;

  constructor(
    private route: ActivatedRoute,
    private vueloService: VueloServiceService,
    private opService: OpinionesService,
    private AlertServiceService: AlertServiceService,
  ) {}

  ngOnInit(): void {
    const user = sessionStorage.getItem('User');
    const userObj = user ? JSON.parse(user) : null;
    this.idUsuario = userObj?.id || 0;
    if (this.vueloId !== null) {
      this.obtenerDetalleVuelo(Number(this.vueloId));
      this.getReseniaEspecifica();
    }
  }

  seleccionarCalificacion(calificacion: number): void {
    this.nuevaCalificacion = calificacion; // Actualiza la calificación
  }

  obtenerDetalleVuelo(id: number): void {
    this.vueloService.obtenerVuelo(id).subscribe(
      (vuelo: Vuelo) => {
        this.vuelo = vuelo;
        console.log('Vuelo obtenido:', this.vuelo); // Depuración
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
        this.AlertServiceService.mostrarAlertaSimple(ALERTA_TIPO.OK, `El ${tipo} ha sido guardado en el carrito`);
      } else {
        this.AlertServiceService.mostrarAlertaSimple(ALERTA_TIPO.WARNING, `Este ${tipo} ya está en el carrito`);
      }
    } else {
      // Si no existe el carrito, creamos uno nuevo con el producto
      sessionStorage.setItem(tipo, JSON.stringify([producto]));
      this.AlertServiceService.mostrarAlertaSimple(ALERTA_TIPO.OK, `El ${tipo} ha sido guardado en el carrito`);
    }
  }





  getReseniaEspecifica(id = this.vueloId, producto = this.producto){
    console.log('id:', id, 'producto:', producto);
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
      idProducto:  this.producto,
      idReferencia: this.vueloId ? parseInt(this.vueloId) : 0,
      idUsuario: this.idUsuario
    };
    this.postResenia(nuevaResenia, this.idUsuario);
    this.nuevaCalificacion = 0;
    this.nuevoComentario = '';

  }

  postResenia(nuevaResenia: any, idUsuario: number) {
    console.log('Resenia:', nuevaResenia, 'idUsuario:', idUsuario);
    this.opService.postresenia(nuevaResenia, this.idUsuario);
    setTimeout(() => {
      this.getReseniaEspecifica();
    }, 500);
  }


}

