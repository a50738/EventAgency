import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { UsersComponent } from '../users/users.component';
import { UserService } from 'src/app/services/user.service';
import { CourseService } from 'src/app/services/course.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EventInformationComponent } from '../event-information/event-information.component';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css']
})
export class UserInformationComponent implements OnInit {

  constructor(private _userService: UserService,
    private _courseService: CourseService,
    public _dialogRef: MatDialogRef<UsersComponent, EventInformationComponent>) { }

  userInformation: any = {}
  courses: any = {}


  ngOnInit() {
    this.userInformation = this._userService.getUserInformation()
    if(this.userInformation.UserRef!=null)
    { 
      this.userInformation.name=this.userInformation.UserRef.name
      this.userInformation.surname=this.userInformation.UserRef.surname
      this.userInformation.id=this.userInformation.id_user
    }
    console.log(this.userInformation)

    this._courseService.getCoursesOfUser(this.userInformation.id)
      .subscribe(
        res => {
        this.courses = res['userCourses']
          console.log(this.courses)
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              console.log('error')
            }
          }
        }
      )
  }
}
