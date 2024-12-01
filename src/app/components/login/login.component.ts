import { AuthServiceService } from './../../services/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { Token, TokenApi } from '../../models/tokenModel';
import { CommonServiceService } from '../../services/common-service.service';
import { AlertServiceService } from '../../common/generalServices/alert-service.service';
import { environment } from '../../environments/environments';
import { HttpClientModule } from '@angular/common/http';
import { ALERTA_TIPO } from '../../common/conts/alerts/sweetAlertConsts';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { waitForAsync } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule, NavbarComponent, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  tokenApi: TokenApi = new TokenApi();
  token: Token = new Token();
  username: string = '';
  password: string = '';
  loggue: boolean = false;

  constructor(private commonService: CommonServiceService,
              private alertService: AlertServiceService,
              private authService: AuthServiceService,
              private router: Router) {}

  ngOnInit(): void {
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  getToken() {
    this.tokenApi = {
      username: this.username,
      password: this.password
    };
    this.authService.getToken(this.tokenApi);
    const token = this.authService.getAccessToken();
    console.log('Token almacenado en sessionStorage:', token);
    if (token !== undefined) {
      setTimeout(() => {
        this.navigateTo('/vuelos');
      }, 2000);
    }
  }

}


