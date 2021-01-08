import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the FacultyProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const ALL_FACULTY_API_URL = 'https://clausthaler-kameruner.com/edocs/api/apiFaculty/allFaculty.php';
@Injectable()
export class FacultyProvider {

  constructor(public http: HttpClient) {
    console.log('Hello FacultyProvider Provider');
  }

  getAllFaculty(){
    return this.http.get(`${ALL_FACULTY_API_URL}`);
  }

}
