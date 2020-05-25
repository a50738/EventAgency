import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { ElementSchemaRegistry } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = "http://localhost:3000/api/register"
  private _loginUrl = "http://localhost:3000/api/login"
  private _userPermissionUrl = "http://localhost:3000/api/userPermission"
  private _registerUrlPostgres = "http://localhost:5000/api2/addUser"
  private _getCurrentEmail = "http://localhost:3000/api/getCurrentUserEmail";

  constructor(private http: HttpClient, private _router: Router) { }

  //Method accepts user object and returns the response that the backend API sends wenether it is available
  registerUser(user)
  {
    return this.http.post<any>(this._registerUrl, user)
  }

  addUserPostgres(user)
  {
    return this.http.post<any>(this._registerUrlPostgres, user)
  }
  
  loginUser(user)
  {
    return this.http.post<any>(this._loginUrl, user)
  }

  loggedIn(){
    return !!localStorage.getItem('token') // reture true if token exists in the browser
  }

  getPermission()
  {
    return this.http.get<any>(this._userPermissionUrl)
  }

  getEmail()
  {
    return this.http.get<any>(this._getCurrentEmail)
  }


  validateRegister(user)
  {
    if(user.name == null || user.surname == null || user.email == null || user.phoneNumber == null || user.password == null)
    {
      return false
    }
    else
    {
      return true
    }
  }

  validateEmail(email)
  {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  logoutUser(){
    localStorage.removeItem('token')
    this._router.navigate(['service/login']) // reture true if token exists in the browser
  }

  getToken(){
    return localStorage.getItem('token')
  }
}
