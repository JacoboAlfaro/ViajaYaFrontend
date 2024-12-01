import { Token, TokenApi } from './../models/tokenModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { AlertServiceService } from '../common/generalServices/alert-service.service';
import { CommonServiceService } from './common-service.service';
import { get } from 'node:http';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  authUrl = environment.apiAuthUrl;
  apiUser = environment.apiUsuarioUrl;
  private token: string | null = null;

  constructor(private http: HttpClient
    , private alertService: AlertServiceService,
    private commonService: CommonServiceService
  ) {}

  login(user: any) {
    return this.http.post(`${this.authUrl}/login`, user);
  }

  logout() {
    sessionStorage.clear();
  }

  getUser(tokenApi: any) {
    const token = sessionStorage.getItem('AccessToken'); // Obtén el token del sessionStorage
    if (!token) {
      console.error('No hay token almacenado en sessionStorage');
      return;
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Agrega el encabezado Authorization
    this.commonService
      .getAll(`${this.apiUser}/porUsername/${tokenApi.username}`, { headers })
      .subscribe(
        (res: any) => {
          sessionStorage.setItem('User', JSON.stringify(res.data)); // Almacena el usuario en sessionStorage
        },
        (error : any) => {
          console.error('Error obteniendo el usuario:', error);
        }
      );
  }

  getToken(tokenApi: TokenApi) {
    this.commonService.post(`${this.authUrl}/login`, tokenApi).subscribe((res: Token) => {
      sessionStorage.setItem('AccessToken', res.token);
      this.getUser(tokenApi);
    });
  }

  getAccessToken(): string | null {
    return sessionStorage.getItem('AccessToken');
  }


}



