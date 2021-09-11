import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';

import { SignUpPage } from '../sign-up/sign-up';

/**
 * Generated class for the MyTabsPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-tabs',
  templateUrl: 'my-tabs.html'
})
export class MyTabsPage {

  current_user : any = LoginPage.current_user;
  rootPage:string;
  flohmarktRoot = 'FlohmarktPage'
  edocsRoot = 'EdocsPage'
  chatRoomRoot = 'ChatRoomPage'
  settingsRoot = 'SettingsPage'

  pageList = [
    {
      title: 'Flohmarkt',
      icon: 'pricetags',
      url :'FlohmarktPage'
    },
    {
      title: 'Edocs',
      icon: 'folder-open',
      url :'EdocsPage'
    },
    {
      title: 'Chat Room',
      icon: 'chatbubbles',
      url :'ChatRoomPage'
    },
    {
      title: 'Settings',
      icon: 'settings',
      url :'SettingsPage'
    },
  ];


  constructor(public navCtrl: NavController) {}

  goToLogin(){
    this.navCtrl.push(LoginPage);
  }



  goToSignUp(){
    this.navCtrl.push(SignUpPage);
  }
}
