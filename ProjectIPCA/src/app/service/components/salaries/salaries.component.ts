import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialogConfig, MatDialog } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { EventService } from 'src/app/services/event.service';
import { Router } from '@angular/router';
import { SalariesEventComponent } from '../salaries-event/salaries-event.component';

@Component({
  selector: 'app-salaries',
  templateUrl: './salaries.component.html',
  styleUrls: ['./salaries.component.css']
})
export class SalariesComponent implements OnInit {

  listData: MatTableDataSource<any>;
  editEventData: any = {}
  displayedColumns: string[] = ['date', 'title', 'actions']

  @ViewChild(MatSort, { static: true }) sort: MatSort
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator
  searchKey: string;
  
  constructor(private _router: Router,
    private _eventService: EventService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this._eventService.getCompletedEvents()
      .subscribe(
        res => {
          this.listData = new MatTableDataSource(res.events)
          console.log(res.events)
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

  Send(row) {
    this.editEventData = row;
    this._eventService.setEditedEvent(row);
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "60%"
    dialogConfig.height = "70%";
    this.dialog.open(SalariesEventComponent, dialogConfig)
  }

}
