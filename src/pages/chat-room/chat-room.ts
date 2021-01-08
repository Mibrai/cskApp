import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatsProvider } from '../../providers/chats/chats'

/**
 * Generated class for the ChatRoomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat-room',
  templateUrl: 'chat-room.html',
})
export class ChatRoomPage {
  readonly uri: string = 'https://clausthaler-kameruner.com/edocs/api/apiChat/';

  constructor(public navCtrl: NavController, public navParams: NavParams, public chatsProvider: ChatsProvider) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ChatRoomPage');
  }

  ionViewWillEnter() {
    // console.log('ionViewWillEnter ChatRoomPage');
    this.chatsProvider.loadAllChat().subscribe(data => {
      console.log(JSON.parse(JSON.stringify(data)));
    });
  }

}
