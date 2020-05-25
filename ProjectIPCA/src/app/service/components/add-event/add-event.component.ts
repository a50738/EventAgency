import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { MatDialogRef, MatSnackBarConfig } from '@angular/material';
import { EventsComponent } from '../events/events.component';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  addEventData : any = {}

  constructor(private _event: EventService,
    private _flashMessage: FlashMessagesService,
    private _notificationService: NotificationService,
    public _dialogRef: MatDialogRef<EventsComponent>) { }

  ngOnInit() {
  }

  addEvent()
  {
    if(!this._event.validateAdd(this.addEventData))
    {
      this._flashMessage.show('Please fill all necessery fields', {cssClass:'alert-danger', timeout: 5000})
      console.log('Please fill all necessery fields');
      return false;
    }
    else
    {
      this._event.addEvent(this.addEventData)
    .subscribe(
      res => 
      {
        console.log(res)
        this._notificationService.success('Submitted seccessfully')
      },
      err => {
        console.log(err)
        this._notificationService.warn('Error: '+err)
        this._flashMessage.show(err.error, {cssClass:'alert-danger', timeout: 5000})}
    )}

    this._dialogRef.afterClosed()
    this._dialogRef.close()
  }
}
