import { AuthServiceService } from './../../services/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { Token, TokenApi } from '../../models/tokenModel';
import { CommonServiceService } from '../../services/common-service.service';
import { AlertServiceService } from '../../common/generalServices/alert-service.service';
import { environment } from '../../environments/environments';
import { HttpClientModule } from '@angular/common/http';
import { ALERTA_TIPO } from '../../common/conts/alerts/sweetAlertConsts';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  tokenApi: TokenApi = new TokenApi();
  token: Token = new Token();
  vuelos: any

  constructor(private commonService: CommonServiceService,
              private alertService: AlertServiceService,
              private authService: AuthServiceService) {}

  ngOnInit(): void {
  }

  getToken() {
    this.tokenApi = {
        username: "0",
        password: "abc123"
    };

    this.commonService.post(`${environment.apiAuthUrl.login}`, this.tokenApi).subscribe((res: Token) => {
      this.token = res;
      sessionStorage.setItem('AccessToken', this.token.token);

      console.log('Token: ' + this.token.token);
    });
  }

  getVuelos(){
    this.commonService.getAll(`${environment.apivueloUrl.crud}`).subscribe((res: any) => {
      this.vuelos = res.data
      console.log("Vuelos " + res.data)
      console.log(this.vuelos[1])
    })
  }
    this.authService.getToken(this.tokenApi);
    const token = this.authService.getAccessToken();

    console.log('Token almacenado en sessionStorage:', token);
  }


}


