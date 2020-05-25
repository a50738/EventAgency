import { Component, OnInit, ViewChild } from '@angular/core';
import { SalariesComponent } from '../salaries/salaries.component';
import { MatDialogRef, MatTableDataSource, MatSort } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { EventService } from 'src/app/services/event.service';
import { ParticipationService } from 'src/app/services/participation.service';
import { NotificationService } from 'src/app/services/notification.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-salaries-event',
  templateUrl: './salaries-event.component.html',
  styleUrls: ['./salaries-event.component.css']
})
export class SalariesEventComponent implements OnInit {

  selectedEvent: any = {}
  listData: MatTableDataSource<any>
  displayedColumns: string[] = ['name', 'salary', 'actions']

  @ViewChild(MatSort, { static: true }) sort: MatSort
  searchKey: string
  permission: string
  salary : string
  selectedParticipationData = {
    salary: null,
  }

  constructor(private _userService: UserService,
    private _eventService: EventService,
    private _participatonService: ParticipationService,
    private _notificationService: NotificationService,
    private _flashMessage: FlashMessagesService,
    public _dialogRef: MatDialogRef<SalariesComponent>) { }

  ngOnInit() {
    this.selectedEvent = this._eventService.getEditedEvent()
    console.log(this.selectedEvent)
    this._userService.getUsersForEvent(this.selectedEvent)
      .subscribe(
        res => {
          this.listData = new MatTableDataSource(res['users'])
          this.listData.sort = this.sort;
        },
        err => {
          console.log(err)
        })
  }

  editSalary()
  {
    if(this.salary==null)
    {
      this._notificationService.warn('Error: insert some data')
    }
    else
    {
      this.selectedParticipationData.salary=this.salary
      console.log(this.selectedParticipationData)
      this._participatonService.updateSalary(this.selectedParticipationData)
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
    
  }
}
