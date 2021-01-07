import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the PostsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const ALL_POST_API_URL = 'https://clausthaler-kameruner.com/edocs/api/apiPost/';
@Injectable()
export class PostsProvider {

  constructor(public http: HttpClient) {
    console.log('Hello PostsProvider Provider');
  }

  getAllPost(){
    return this.http.get(`${ALL_POST_API_URL}`);
  }

}
