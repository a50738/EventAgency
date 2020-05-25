import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatInputModule, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { MatSort } from '@angular/material/sort';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
import { UserInformationComponent } from '../user-information/user-information.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  listData: MatTableDataSource<any>;
  deleteUserData: any = {}
  displayedColumns: string[] = ['name', 'surname', 'phone_number', 'actions']

  @ViewChild(MatSort, { static: true }) sort: MatSort
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator
  searchKey: string;

  constructor(
    private _router: Router,
    private _userService: UserService,
    private _notificationService: NotificationService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this._userService.getUsers()
      .subscribe(
        res => {
          this.listData = new MatTableDataSource(res.users)
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

  deleteUser() {
    this._userService.deleteUserMongo(this.deleteUserData)
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
      
    this._userService.deleteUserPostgres(this.deleteUserData)
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
    this._router.navigate(['service/users'])
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
