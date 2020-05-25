import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _usersUrl = "http://localhost:5000/api2/getUsers";

  constructor(private http:HttpClient) { }


  getUsers() {
    return this.http.get<{message: string; users: any }>(this._usersUrl)
  }

  // deleteUser(user)
  // {
  //   this.http.delete('http://localhost:3000/api/deleteUser/'+ user.email , user)
  //   return this.http.delete('http://localhost:5000/api2/deleteUser/'+ user.email , user)
  // }

  deleteUserMongo(user)
  {
    return this.http.delete('http://localhost:3000/api/deleteUser/'+ user.email , user)
  }

  deleteUserPostgres(user)
  {
    return this.http.delete('http://localhost:5000/api2/deleteUser/'+ user.email +"/"+ user.id)
  }

  getUsersForEvent(event) {
    return this.http.get<{message: string; users: any }>('http://localhost:5000/api2/getUsersForEvent/'+ event.id, event.id_position)
  }

  userData: any = {}

  setUserInformation(row)
  {
    this.userData=row
  }

  getUserInformation()
  {
    return this.userData
  }

}
