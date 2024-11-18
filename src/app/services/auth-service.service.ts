import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  authUrl = environment.apiAuthUrl;
  constructor(private http: HttpClient) { }

  login(user: any){
    return this.http.post(`${this.authUrl}/login`, user);
  }
}
