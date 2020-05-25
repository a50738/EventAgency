import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { UserEventsComponent } from '../user-events/user-events.component';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event-information-from-participations',
  templateUrl: './event-information-from-participations.component.html',
  styleUrls: ['./event-information-from-participations.component.css']
})
export class EventInformationFromParticipationsComponent implements OnInit {

  constructor(private _eventService:EventService,
     public _dialogRef: MatDialogRef<UserEventsComponent>
     ) { }

  selectedEvent: any = {}

  ngOnInit() {
    this.selectedEvent=this._eventService.getEditedEvent()
    
  }

}
