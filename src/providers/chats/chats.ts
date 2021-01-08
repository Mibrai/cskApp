import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ChatsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const CHAT_API_URI = 'https://clausthaler-kameruner.com/edocs/api/apiChat/';

@Injectable()
export class ChatsProvider {


  constructor(public http: HttpClient) {
    console.log('Hello ChatsProvider Provider');
  }

  loadAllChat() {
    return this.http.get(`${CHAT_API_URI}`);
  }

}
