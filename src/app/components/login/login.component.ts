import { Component, OnInit } from '@angular/core';
import { Token, TokenApi } from '../../models/tokenModel';
import { CommonServiceService } from '../../services/common-service.service';
import { AlertServiceService } from '../../common/generalServices/alert-service.service';
import { environment } from '../../environments/environments';
import { HttpClientModule } from '@angular/common/http';


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

  constructor(private commonService: CommonServiceService, 
              private alertService: AlertServiceService) {}

  ngOnInit(): void {
  }

  getToken() {
    this.tokenApi = {
      username: "0",
      password: "abc123"
    };
    this.commonService.post(`${environment.apiAuthUrl}/login`, this.tokenApi).subscribe((res: Token) => {
      this.token = res;
      sessionStorage.setItem('AccessToken', this.token.token);

      //Log
      console.log('Token: ' + this.token.token);
    });
  }
}
