import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginPageComponent implements OnInit {

  loginUserData : any = {}
  constructor(public _auth: AuthService,
    public _router: Router,
    private _flashmessage: FlashMessagesService) {}

  ngOnInit() {
  }

  loginUser()
  {
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res => 
      {
        console.log(res)
        localStorage.setItem('token', res.token)
        this._router.navigate(['service/events'])
      },
      err => this._flashmessage.show(err.error, {cssClass:'alert-danger', timeout: 5000})
    )
  }

}
