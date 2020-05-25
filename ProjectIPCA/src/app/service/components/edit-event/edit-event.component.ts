import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { MatDialogRef } from '@angular/material';
import { EventsComponent } from '../events/events.component';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {

  editEventData : any = {}

  constructor(private _event: EventService,
    private _flashMessage: FlashMessagesService,
    private _notificationService: NotificationService,
    public _dialogRef: MatDialogRef<EventsComponent>) { }

  ngOnInit() {
    this.editEventData=this._event.getEditedEvent()
  }

  editEvent()
  {
    if(!this._event.validateAdd(this.editEventData))
    {
      this._flashMessage.show('Please fill all necessery fields', {cssClass:'alert-danger', timeout: 5000})
      console.log('Please fill all necessery fields');
      return false;
    }
    else
    {
      this._event.updateEvent(this.editEventData)
    .subscribe(
      res => 
      {
        console.log(res)
        this._notificationService.success('Edited succesfully')
      },
      err => {
        console.log(err)
        this._notificationService.warn('Error: '+err)
        this._flashMessage.show(err.error, {cssClass:'alert-danger', timeout: 5000})}
    )}

    this._dialogRef.afterClosed()
    this._dialogRef.close()
  }

  setValue()
  {
    this.editEventData=this._event.editData
  }
}
