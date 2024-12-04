import { Component } from '@angular/core';
import { NavbarComponent } from "../../common/navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { AlertServiceService } from './../../common/generalServices/alert-service.service';
import { ReservaServiceService } from '../../services/reserva-service.service';
import { ALERTA_TIPO } from '../../common/conts/alerts/sweetAlertConsts';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {
  vuelos: any[] = [];
  hoteles: any[] = [];
  paquetes: any[] = [];
  idUsuario: number = 0;
  reservaCompletada: boolean = false; // Cambiar a 'false' para que el botón de reserva esté visible
  total: number = 0;

  constructor(private alertService: AlertServiceService,
              private reservaService: ReservaServiceService) { }

  ngOnInit(): void {
    this.cargarCarrito();
    const user = sessionStorage.getItem('User');
    const userObj = user ? JSON.parse(user) : null;
    this.idUsuario = userObj?.id || 0;
  }

  cargarCarrito(): void {
    // Cargar los productos de cada tipo de carrito desde sessionStorage
    const vuelos = sessionStorage.getItem('vuelo');
    const hoteles = sessionStorage.getItem('hotel');
    const paquetes = sessionStorage.getItem('paquete');

    if (vuelos) {
      this.vuelos = JSON.parse(vuelos);
    }

    if (hoteles) {
      this.hoteles = JSON.parse(hoteles);
    }

    if (paquetes) {
      this.paquetes = JSON.parse(paquetes);
    }

    // Verificar si el carrito está vacío
    this.verificarCarritoVacio();
    this.calcularTotal();
  }

  eliminarProducto(index: number, tipo: string): void {
    // Eliminar un producto del carrito según su tipo
    if (tipo === 'vuelo') {
      this.vuelos.splice(index, 1);
    } else if (tipo === 'hotel') {
      this.hoteles.splice(index, 1);
    } else if (tipo === 'paquete') {
      this.paquetes.splice(index, 1);
    }

    this.actualizarCarrito(tipo);
    this.calcularTotal();

    // Verificar si el carrito está vacío después de eliminar un producto
    this.verificarCarritoVacio();
  }

  verificarCarritoVacio(): void {
    // Si todos los arrays están vacíos, mostrar mensaje de carrito vacío
    if (this.vuelos.length === 0 && this.hoteles.length === 0 && this.paquetes.length === 0) {
      this.alertService.mostrarAlertaSimple(ALERTA_TIPO.WARNING, 'Tu carrito está vacío. Añade productos para continuar con la compra.');
      this.reservaCompletada = true; // Desactivar el botón de reservar si el carrito está vacío
    } else {
      this.reservaCompletada = false; // Activar el botón de reservar si el carrito tiene productos
    }
  }

  actualizarCarrito(tipo: string): void {
    // Actualizar el carrito en sessionStorage según el tipo
    if (tipo === 'vuelo') {
      sessionStorage.setItem('vuelo', JSON.stringify(this.vuelos));
    } else if (tipo === 'hotel') {
      sessionStorage.setItem('hotel', JSON.stringify(this.hoteles));
    } else if (tipo === 'paquete') {
      sessionStorage.setItem('paquete', JSON.stringify(this.paquetes));
    }
  }

  enviarReserva() {
    // Verificar que haya al menos un vuelo, un hotel y un paquete seleccionados
    if (!this.vuelos || this.vuelos.length === 0) {
      this.alertService.mostrarAlertaSimple(ALERTA_TIPO.ERROR, 'Por favor, selecciona al menos un vuelo.');
      return;
    }
    if (!this.hoteles || this.hoteles.length === 0) {
      this.alertService.mostrarAlertaSimple(ALERTA_TIPO.ERROR, 'Por favor, selecciona al menos un hotel.');
      return;
    }
    if (!this.paquetes || this.paquetes.length === 0) {
      this.alertService.mostrarAlertaSimple(ALERTA_TIPO.ERROR, 'Por favor, selecciona al menos un paquete turístico.');
      return;
    }

    // Crear la reserva con los datos del carrito
    const nuevaReserva = {
      estado: true,
      fechaReserva: new Date().toISOString().split('T')[0], // Fecha actual
      idUsuario: this.idUsuario,
      idVuelos: this.vuelos?.map(vuelo => vuelo.id) || [],
      idHoteles: this.hoteles?.map(hotel => hotel.id) || [],
      idPaquetes: this.paquetes?.map(paquete => paquete.id) || []
    };

    // Enviar la reserva utilizando el servicio
    this.postReserva(nuevaReserva);

    // Limpiar los campos después de enviar la reserva
    this.vuelos = [];
    this.paquetes = [];
    this.hoteles = [];
    this.reservaCompletada = true;

    this.alertService.mostrarAlertaSimple(ALERTA_TIPO.OK, 'La reserva ha sido enviada.');
  }

  postReserva(nuevaReserva: any) {
    // Llamada al servicio de reserva
    this.reservaService.postReserva(nuevaReserva);
    sessionStorage.removeItem('vuelo');
    sessionStorage.removeItem('hotel');
    sessionStorage.removeItem('paquete');

    // Recargar el carrito
    this.cargarCarrito();
  }

  calcularTotal(): void {
    // Calcular el total sumando los precios de los productos
    let totalVuelos = this.vuelos.reduce((sum, producto) => sum + producto.precio, 0);
    let totalHoteles = this.hoteles.reduce((sum, producto) => sum + producto.precioNoche, 0);
    let totalPaquetes = this.paquetes.reduce((sum, producto) => sum + producto.precio, 0);

    this.total = totalVuelos + totalHoteles + totalPaquetes;
  }
}
