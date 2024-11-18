import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
/* import { UserSummary } from '../../models/userModel';
import { Security } from '../../models/securityModel'; */
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  /* private usuarioLogadoJson: any
  private usuarioLogado: UserSummary = new UserSummary()

  constructor(private http: HttpClient) { }

  variablesUsuarioLogado(){
    this.usuarioLogadoJson = sessionStorage.getItem('UsuarioLogado')
    this.usuarioLogado = JSON.parse(this.usuarioLogadoJson)
    return this.usuarioLogado
  }
  
  variablesLogin(){
    var loginLogado: Security = new Security()
    var loginLogadoJson: any = sessionStorage.getItem('InfoLogin')
    loginLogado = JSON.parse(loginLogadoJson)
    return loginLogado
  } */
  
}