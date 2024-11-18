import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { ALERTA_TIPO } from '../conts/alerts/sweetAlertConsts';

@Injectable({
  providedIn: 'root'
})
export class AlertServiceService {

  constructor() { }

  mostrarAlertaSimple(type: string, message: string): void {
    if(type == ALERTA_TIPO.OK)
      Swal.fire({ icon: 'success', title: 'Éxito', text: message,});
    if(type == ALERTA_TIPO.ERROR)
      Swal.fire({ icon: 'error', title: 'Error', text: message,});
    if(type == ALERTA_TIPO.WARNING)
      Swal.fire({ icon: 'warning', title: 'Atento', text: message,});
    if(type == ALERTA_TIPO.QUESTION)
      Swal.fire({ icon: 'question', title: '¿Está seguro?', text: message,});
  }

  mostrarAlertaTipoToast(type: string, message:string):void {

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton:false,
      timer:5000
    })
    if(type == ALERTA_TIPO.OK){ Toast.fire({icon: "success", text: message})}
    if(type == ALERTA_TIPO.ERROR){ Toast.fire({icon: "error", text: message})}
    if(type == ALERTA_TIPO.QUESTION){ Toast.fire({icon: "question", text: message})}
    if(type == ALERTA_TIPO.WARNING){ Toast.fire({icon: "warning", text: message})}

    
  }
}

