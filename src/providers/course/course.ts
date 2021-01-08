import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CourseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const ALL_COURSE_API_URL = 'https://clausthaler-kameruner.com/edocs/api/apiCourse/allCourse.php';
const ALL_COURSE_BY_FACULTY_API_URL = 'https://clausthaler-kameruner.com/edocs/api/apiCourse/coursesByFaculty.php';
@Injectable()
export class CourseProvider {

  constructor(public http: HttpClient) {
    console.log('Hello CourseProvider Provider');
  }

  getAllCourse(){
    return this.http.get(`${ALL_COURSE_API_URL}`);
  }

  getCoursesByFaculty(codeFaculty:String){
    return this.http.get(`${ALL_COURSE_BY_FACULTY_API_URL}?codeFaculty=${codeFaculty}`);
  }
}
