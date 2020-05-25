import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ParticipationService {

  private _getCurrentEmail = "http://localhost:3000/api/getCurrentUserEmail";
  private _addParticipationUrl = "http://localhost:5000/api2/addParticipation";
  private _positionsUrl = "http://localhost:5000/api2/getPositions";
  private _addPositionUrl="http://localhost:5000/api2/addPosition";

  currentUserEmail: any

  constructor( private http: HttpClient) { }

  getCurrentEmail()
  {
    this.http.get<any>(this._getCurrentEmail).subscribe(res => {
      this.currentUserEmail = res;
      console.log(this.currentUserEmail);
    });
  }

  addParticiparion(event)
  {
    return this.http.post<any>(this._addParticipationUrl  , { event:event.id , email: this.currentUserEmail, position: event.id_position})
  }

  getParticipations()
  {
    return this.http.get<{message: string; participations: any }>('http://localhost:5000/api2/getParticipations/' + this.currentUserEmail)
  }

  // Signing off the user from the event
  deleteParticipation(participation)
  {
    return this.http.delete('http://localhost:5000/api2/deleteParticipation/'+ participation.id)
  }

  updateSalary(participation)
  {
    return this.http.put('http://localhost:5000/api2/updateSalary/'+ participation.id , participation)
  }

  getPositons() {
    return this.http.get<{message: string; positions: any }>(this._positionsUrl)
  }

  addPosition(position)
  {
    console.log(position)
    return this.http.post<any>(this._addPositionUrl, {name: position})
  }

  deletePosition(idPosition)
  {
    return this.http.delete('http://localhost:5000/api2/deletePosition/'+ idPosition , idPosition)
  }
}
