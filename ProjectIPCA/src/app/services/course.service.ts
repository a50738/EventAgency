import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private _CoursesUrl = "http://localhost:5000/api2/getCourses";
  private _addCourseOfUserUrl = "http://localhost:5000/api2/addCourseOfUser";
  private _addCourseUrl = "http://localhost:5000/api2/addCourse";


  constructor(private http: HttpClient) { }

  getCourses() {
    return this.http.get<{message: string; courses: any }>(this._CoursesUrl)
  }

  getCoursesOfUser(userId) {
    return this.http.get<{message: string; userCourses: any }>("http://localhost:5000/api2/getCoursesOfUser/" + userId)
  }

  //Add course of the user
  addCourse(course)
  {
    return this.http.post<any>(this._addCourseOfUserUrl, course)
  }

  //Add new course to the database
  addNewCourse(course)
  {
    return this.http.post<any>(this._addCourseUrl, course)
  }

  deleteCourse(idCourse)
  {
    return this.http.delete('http://localhost:5000/api2/deleteCourse/'+ idCourse , idCourse)
  }
}
