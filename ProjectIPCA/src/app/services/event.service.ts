import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private _EventsUrl = "http://localhost:5000/api2/getEvents";
  private _CompletedEventsUrl = "http://localhost:5000/api2/getCompletedEvents";
  private _addEventUrl = "http://localhost:5000/api2/addEvent";

  constructor(private http: HttpClient) { }

  getEvents() {
    return this.http.get<{message: string; events: any }>(this._EventsUrl)
  }

  getCompletedEvents() {
    return this.http.get<{message: string; events: any }>(this._CompletedEventsUrl)
  }

  addEvent(event)
  {
    return this.http.post<any>(this._addEventUrl, event)
  }

  updateEvent(event)
  {
    return this.http.put('http://localhost:5000/api2/updateEvent/'+ event.id , event)
  }

  deleteEvent(event)
  {
    return this.http.delete('http://localhost:5000/api2/deleteEvent/'+ event.id , event)
  }

  validateAdd(event)
  {
    if(event.title == null || event.city == null || event.start_date == null || event.end_date == null || event.amount_of_people == null)
    {
      return false
    }
    else
    {
      return true
    }
  }

  editData: any = {}

  setEditedEvent(row)
  {
    this.editData=row
  }

  getEditedEvent()
  {
    return this.editData
  }

}
