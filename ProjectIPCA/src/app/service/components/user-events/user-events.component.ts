import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { ParticipationService } from 'src/app/services/participation.service';
import { NotificationService } from 'src/app/services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { EventInformationComponent } from '../event-information/event-information.component';
import { EventService } from 'src/app/services/event.service';
import { EventInformationFromParticipationsComponent } from '../event-information-from-participations/event-information-from-participations.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-events',
  templateUrl: './user-events.component.html',
  styleUrls: ['./user-events.component.css'],
  providers: [DatePipe]
  

})
export class UserEventsComponent implements OnInit {

  listData: MatTableDataSource<any>;

  deleteParticipationData: any = {}
  displayedColumns: string[] = ['id_user', 'id_event', 'salary', 'actions']

  @ViewChild(MatSort, { static: true }) sort: MatSort
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator
  searchKey: string;
  todayDate : string;

  constructor(
    private _router: Router,
    private _participationService: ParticipationService,
    private _notificationService: NotificationService,
    private _eventService: EventService,
    private dialog: MatDialog,
    private datePipe: DatePipe
  ) { this.todayDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd'); }
  

  ngOnInit() {
    this._participationService.getCurrentEmail()
    this._participationService.getParticipations()
      .subscribe(
        res => {
          this.listData = new MatTableDataSource(res['participations'])
          this.listData.sort = this.sort;
          this.listData.paginator = this.paginator
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

  
  SignOff() {      
      this._participationService.deleteParticipation(this.deleteParticipationData)
      .subscribe(
        res => {
          console.log(res)
          this._notificationService.success('Signed off seccessfully')
        },
        err => {
          console.log(err)
          this._notificationService.warn('Error: ' + err)
        }
      )
    
    // window.location.reload();
  }

  Info(row) {
    console.log(row)
    this._eventService.setEditedEvent(row);
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "40%"
    dialogConfig.height = "45%";
    
    this.dialog.open(EventInformationFromParticipationsComponent, dialogConfig)
  }

  
}
