import { Token, TokenApi } from './../models/tokenModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { AlertServiceService } from '../common/generalServices/alert-service.service';
import { CommonServiceService } from './common-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  authUrl = environment.apiAuthUrl;
  private token: string | null = null;

  constructor(private http: HttpClient
    , private alertService: AlertServiceService,
    private commonService: CommonServiceService
  ) {}

  login(user: any) {
    return this.http.post(`${this.authUrl}/login`, user);
  }

  getToken(tokenApi: TokenApi) {
    this.commonService.post(`${environment.apiAuthUrl}/login`, tokenApi).subscribe((res: Token) => {
      sessionStorage.setItem('AccessToken', res.token);
      sessionStorage.setItem('User', tokenApi.username);
    });
  }

  getAccessToken(): string | null {
    return sessionStorage.getItem('AccessToken');

  }
}



