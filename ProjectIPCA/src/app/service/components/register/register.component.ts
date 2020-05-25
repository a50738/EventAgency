import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { CourseService } from 'src/app/services/course.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData: any = {}
  coursesData: any = {}
  courseDataToSend = []
  sendCourse: any = {
    'id_user': '',
    'id_course': ''
  }

  constructor(
    private _auth: AuthService,
    private _courseService: CourseService,
    private _router: Router,
    private _flashMessage: FlashMessagesService) { }


  ngOnInit() {
    this._courseService.getCourses()
      .subscribe(
        res => {
          this.coursesData = res['courses'];
          console.log(this.coursesData)
        }
      )
  }

  regTEST() {
    if (this.courseDataToSend.length != 0) {
      for (let i = 0; i < this.courseDataToSend.length; i++) {
        // console.log(this.courseDataToSend[i])   // It shows '1' or '1' and then '2' when options selected
        this.sendCourse.id_course = this.courseDataToSend[i]
        console.log(this.sendCourse)
      }
    }
    else { console.log("There is no records") }
  }


  registerUser() {
    if (!this._auth.validateRegister(this.registerUserData)) {
      this._flashMessage.show('Please fill all necessery fields', { cssClass: 'alert-danger', timeout: 5000 })
      console.log('Please fill all necessery fields');
      return false;
    }
    else if (!this._auth.validateEmail(this.registerUserData.email)) {
      this._flashMessage.show('Please use valid email', { cssClass: 'alert-danger', timeout: 5000 })
      console.log('Please use valid email');
      return false;
    }
    else {
      this._auth.registerUser(this.registerUserData)
        .subscribe(
          res => {
            console.log(res)

            this._auth.addUserPostgres(this.registerUserData)
              .subscribe(
                res => {

                  if (this.courseDataToSend.length != 0) {
                    for (let i = 0; i < this.courseDataToSend.length; i++) {
                      this.sendCourse.id_user = res.userId
                      this.sendCourse.id_course = this.courseDataToSend[i]

                      this._courseService.addCourse(this.sendCourse)
                        .subscribe(
                          res => {
                            console.log(res.message)
                          },
                          err => {
                            console.log(err)
                          }
                        )
                    }
                  }

                }
              )
            localStorage.setItem('token', res.token)
            this._router.navigate(['service/events'])
          },
          err => this._flashMessage.show(err.error, { cssClass: 'alert-danger', timeout: 5000 })
        )

    }
  }

  loginPanel() {
    this._router.navigate(['service/login']);
  }

}
