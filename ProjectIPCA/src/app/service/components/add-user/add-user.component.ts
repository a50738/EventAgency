import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private _auth: AuthService,
    private _router: Router,
    private _notificationService: NotificationService,
    private _flashMessage: FlashMessagesService) { }

  registerUserData : any = {}

  permission: any 

  ngOnInit() {
  }


  registerUser()
  {
    if(!this._auth.validateRegister(this.registerUserData))
    {
      this._flashMessage.show('Please fill all necessery fields', {cssClass:'alert-danger', timeout: 5000})
      console.log('Please fill all necessery fields');
      return false;
    }
    else if (!this._auth.validateEmail(this.registerUserData.email))
    {
      this._flashMessage.show('Please use valid email', {cssClass:'alert-danger', timeout: 5000})
      console.log('Please use valid email');
      return false;
    }
    else
    {
      this.registerUserData.permission=this.permission;
      this._auth.registerUser(this.registerUserData)
    .subscribe(
      res => 
      {
        console.log(res)
      },
      err => this._flashMessage.show(err.error, {cssClass:'alert-danger', timeout: 5000})
      )

      this._auth.addUserPostgres(this.registerUserData)
      .subscribe(
        res => 
        {
          console.log(res)
          this._notificationService.success('User added succesfully')

        },
        err => console.log(err)
        
      )
    }
    this._router.navigate(['service/users'])
  }
}
