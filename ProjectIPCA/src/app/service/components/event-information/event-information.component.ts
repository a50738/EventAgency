import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatTableDataSource, MatSort, MatDialogConfig, MatDialog } from '@angular/material';
import { EventsComponent } from '../events/events.component';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { ParticipationService } from 'src/app/services/participation.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserInformationComponent } from '../user-information/user-information.component';

@Component({
  selector: 'app-event-information',
  templateUrl: './event-information.component.html',
  styleUrls: ['./event-information.component.css']
})
export class EventInformationComponent implements OnInit {

  constructor(private _eventService: EventService,
    private _userService: UserService,
    private _authService: AuthService,
    private _participationService: ParticipationService,
    private _notificationService: NotificationService,
    private dialog: MatDialog,
    public _dialogRef: MatDialogRef<EventsComponent>) { }

    selectedEvent: any = {}

    listData: MatTableDataSource<any>
    displayedColumns: string[] = ['name_surname', 'phone', 'position', 'actions']
    deleteParticipantData: any = {}

    @ViewChild(MatSort, { static: true }) sort: MatSort
    searchKey: string
    permission: string

  ngOnInit() {
    this.getPermission()

    this.selectedEvent=this._eventService.getEditedEvent()
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

  getPermission() {
    this._authService.getPermission()
      .subscribe(
        res => { this.permission = res },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              console.log('error')
            }
          }
        }
      )
  }

  deleteParticipant() {     
      this._participationService.deleteParticipation(this.deleteParticipantData)
      .subscribe(
        res => {
          console.log(res)
          this._notificationService.success('Deleted seccessfully')
        },
        err => {
          console.log(err)
          this._notificationService.warn('Error: ' + err)
        }
      )
    window.location.reload();
  }

  Info(row) {
    this._userService.setUserInformation(row)
    console.log(row)
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "40%"
    dialogConfig.height = "60%";
    this.dialog.open(UserInformationComponent, dialogConfig)
  }
}
