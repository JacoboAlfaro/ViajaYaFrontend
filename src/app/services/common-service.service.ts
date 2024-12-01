import { AlertServiceService } from '../common/generalServices/alert-service.service';
import { ALERTA_TIPO } from '../common/conts/alerts/sweetAlertConsts';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { ALERTA_MENSAJES } from '../common/conts/alerts/alertMessages';

@Injectable({
  providedIn: 'root',
})
export class CommonServiceService {
  constructor(
    private http: HttpClient,
    private alertService: AlertServiceService
  ) {}

  public getAll(url: string, options?: any): any {
    return this.http
      .get(url, options)

      .pipe(
        map((resp: any) => {
          if (!resp.respuestaExitosa) {
            this.pintarError(resp.mensaje);
          }

          this.alertService.mostrarAlertaTipoToast(
            ALERTA_TIPO.OK,
            resp.mensaje
          );

          return resp;
        }),

        catchError((err) => {
          console.error(err);

          this.mostrarMensajeError(err);

          return of(err);
        })
      );
  }

  public getById(url: string, id: number): any {
    return this.http.get(`${url}/${id}`).pipe(
      map((resp: any) => {
        if (!resp.respuestaExitosa) {
          this.pintarError(resp.mensaje);
        }
        this.alertService.mostrarAlertaTipoToast(ALERTA_TIPO.OK, resp.mensaje);
        return resp.data;
      }),
      catchError((err) => {
        console.error(err);
        this.mostrarMensajeError(err);
        return of(err);
      })
    );
  }

  public post(url: string, dato: any): any {
    return this.http.post(url, dato).pipe(
      map((resp: any) => {
        if (!resp.respuestaExitosa) {
          this.pintarError(resp.mensaje);
        }
        if (resp.mensaje) {
          this.alertService.mostrarAlertaTipoToast(
            ALERTA_TIPO.OK,
            resp.mensaje
          );
        }
        return resp;
      }),
      catchError((err) => {
        console.error(err);
        this.mostrarMensajeError(err);
        return of(err);
      })
    );
  }

  public put(url: string, dato: any): any {
    return this.http.put(`${url}/${dato.id}`, dato).pipe(
      map((resp: any) => {
        if (!resp.respuestaExitosa) {
          this.pintarError(resp.mensaje);
        }
        this.alertService.mostrarAlertaTipoToast(ALERTA_TIPO.OK, resp.mensaje);
        return resp;
      }),
      catchError((err) => {
        console.error(err);
        this.mostrarMensajeError(err);
        return of(err);
      })
    );
  }

  public delete(url: string, id: number): any {
    return this.http.delete(`${url}/${id}`).pipe(
      map((resp: any) => {
        if (!resp.respuestaExitosa) {
          this.pintarError(resp.mensaje);
        }
        this.alertService.mostrarAlertaTipoToast(ALERTA_TIPO.OK, resp.mensaje);
        return resp;
      }),
      catchError((err) => {
        console.error(err);
        this.mostrarMensajeError(err);
        return of(err);
      })
    );
  }

  public patch(url: string, id: any): any {
    return this.http.patch(`${url}/${id}`, id).pipe(
      map((resp: any) => {
        if (!resp.respuestaExitosa) {
          this.pintarError(resp.mensaje);
        }
        this.alertService.mostrarAlertaTipoToast(ALERTA_TIPO.OK, resp.mensaje);
        return resp;
      }),
      catchError((err) => {
        console.error(err);
        this.mostrarMensajeError(err);
        return of(err);
      })
    );
  }

  //FUNCIONES PARA MANEJAR ERRORES
  private pintarError(mensaje: string) {
    console.error(mensaje);
    this.alertService.mostrarAlertaTipoToast(ALERTA_TIPO.ERROR, mensaje);
  }

  private mostrarMensajeError(e: any) {
    var err = e.error;
    let mensaje = '';

    if (typeof err === 'string') {
      mensaje = err;
      console.log(mensaje);
    } else if (err.hasOwnProperty('errors')) {
      const errors = err.errors;
      const errorKeys = Object.keys(errors);

      if (errors.hasOwnProperty('detail')) {
        mensaje = errors.detail;
        console.log(mensaje);
      } else if (errorKeys.length > 0) {
        const firstErrorKey = errorKeys[0];
        const firstErrorValue = errors[firstErrorKey][0];
        mensaje = firstErrorValue;
        console.log(mensaje);
      }
    } else if (err.hasOwnProperty('detail')) {
      mensaje = err.detail;
      console.log(mensaje);
    } else {
      mensaje = ALERTA_MENSAJES.generico;
    }
    console.log(mensaje);

    this.alertService.mostrarAlertaTipoToast(ALERTA_TIPO.ERROR, mensaje);
  }
}
