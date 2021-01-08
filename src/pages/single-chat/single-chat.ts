import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SingleChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-single-chat',
  templateUrl: 'single-chat.html',
})
export class SingleChatPage {
  title: any = "SingleChatPage";
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.title = navParams.get("title");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SingleChatPage');
  }

}
