import { Component, OnInit, ViewChild } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatInputModule, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { MatSort } from '@angular/material/sort';
import { AuthService } from 'src/app/services/auth.service';
import { AddEventComponent } from '../add-event/add-event.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EditEventComponent } from '../edit-event/edit-event.component';
import { NotificationService } from 'src/app/services/notification.service';
import { ParticipationService } from 'src/app/services/participation.service';
import { EventInformationComponent } from '../event-information/event-information.component';
import { UserService } from 'src/app/services/user.service';
import { CourseService } from 'src/app/services/course.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
  providers: [DatePipe]
})
export class EventsComponent implements OnInit {

  listData: MatTableDataSource<any>;
  editEventData: any = {}
  deleteEventData: any = {}
  signInData: any = {}
  displayedColumns: string[] = ['date', 'title', 'city', 'people', 'actions']
  positions: any = {}
  courses: any = {}

  @ViewChild(MatSort, { static: true }) sort: MatSort
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator
  searchKey: string;
  todayDate: string;

  radioSelected: any = {}
  permission: string;

  positionAdd: string;
  courseAdd: any = {}
  

  constructor(private _eventService: EventService,
    private _router: Router,
    private _authService: AuthService,
    private _participationService: ParticipationService,
    private _notificationService: NotificationService,
    private _userService: UserService,
    private _courseService: CourseService,
    private dialog: MatDialog,
    private datePipe: DatePipe)
    { this.todayDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');}

  ngOnInit() {
    this.getPermission()
    this.getPositions()
    this.getCourses()
    this._participationService.getCurrentEmail()

    this._eventService.getEvents()
      .subscribe(
        res => {
          this.listData = new MatTableDataSource(res.events)
          //Should have sort dates
          // this.listData.sortingDataAccessor = (item, property) => {
          //   switch (property) {
          //      case 'start_date': return new Date(item.start_date);
          //      default: return item[property];
          //   }
          // };
          this.listData.sort = this.sort;
          this.listData.paginator = this.paginator
          // Filter the data, to prevent for searching the data that are not showed in the table // doesn't work
          // this.listData.filterPredicate = (data, filter) => {
          //   return this.displayedColumns.some(element => {
          //     return element != 'actions' && data[element].toLowerCase().indexOf(filter) != -1;
          //   })
          // }
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this._router.navigate(['service/login'])
            }
          }
        }
      )
  }

  clearSearch() {
    this.searchKey = "";
    this.FilterSearch();
  }

  FilterSearch() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
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

  getPositions() {
    this._participationService.getPositons()
      .subscribe(
        res => { this.positions = res['positions'] 
      console.log(this.positions)},
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              console.log('error')
            }
          }
        }
      )
  }

  getCourses() {
    this._courseService.getCourses()
      .subscribe(
        res => { this.courses = res['courses'] 
      console.log(this.courses)},
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              console.log('error')
            }
          }
        }
      )
  }

  createEvent() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "60%"
    dialogConfig.height = "70%";
    this.dialog.open(AddEventComponent, dialogConfig)
  }

  Edit(row) {
    this.editEventData = row;
    this._eventService.setEditedEvent(row);
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "60%"
    dialogConfig.height = "70%";
    this.dialog.open(EditEventComponent, dialogConfig)
  }

  Info(row) {
    this.editEventData = row;
    this._eventService.setEditedEvent(row);
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    if (this.permission == 'admin') {
      dialogConfig.width = "70%"
      dialogConfig.height = "70%";
    }
    else {
      dialogConfig.width = "50%"
      dialogConfig.height = "50%";
    }
    this.dialog.open(EventInformationComponent, dialogConfig)
  }

  deleteEvent() {
    this._eventService.deleteEvent(this.deleteEventData)
      .subscribe(
        res => {
          console.log(res)
          this._notificationService.success('Submitted seccessfully')
        },
        err => {
          console.log(err)
          this._notificationService.warn('Error: ' + err)
        }
      )
    window.location.reload();
  }

  signForEvent() {
    this.signInData["id_position"] = this.radioSelected;

    this._participationService.addParticiparion(this.signInData)
      .subscribe(
        res => {
          console.log(res)
          if (res.message == 'You are already signed') { this._notificationService.warn(res.message) }
          else if (res.message == 'Signed for an event') { this._notificationService.success(res.message) }
          else if (res.message == 'List is full') { this._notificationService.warn(res.message) }
  },
        err => {
          console.log(err)
          this._notificationService.warn('Error: ' + err)
        }
      )
  }

  addPosition()
  {
    this._participationService.addPosition(this.positionAdd)
    .subscribe(
      res => 
      {
        console.log(res)
        this._notificationService.success('Submitted seccessfully')
      },
      err => {
        console.log(err)
        this._notificationService.warn('Error: '+err)
        }
    )
    window.location.reload();
  }
  
  deletePosition(idPosition)
  {
    this._participationService.deletePosition(idPosition)
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

  addCourse()
  {
    this._courseService.addNewCourse(this.courseAdd)
    .subscribe(
      res => 
      {
        console.log(res)
        this._notificationService.success('Added seccessfully')
      },
      err => {
        console.log(err)
        this._notificationService.warn('Error: '+err)
        }
    )
    window.location.reload();
  }


  deleteCourse(idCourse)
  {
    this._courseService.deleteCourse(idCourse)
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

}

