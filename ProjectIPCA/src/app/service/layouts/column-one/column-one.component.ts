import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-column-one',
  templateUrl: './column-one.component.html',
  styleUrls: ['./column-one.component.css']
})
export class ColumnOneComponent implements OnInit {

  constructor(public router:Router,private _authService:AuthService) { }


  permission : string;
  
  ngOnInit() {
    this.getPermission();
      
  }

  getPermission(){
    this._authService.getPermission()
    .subscribe(
      res => {this.permission = res},
      err => {
        if (err instanceof HttpErrorResponse)
        {
          if(err.status === 401)
          {
            console.log('error')
          }
        }
      }
    )}

}