import { Component,ViewChild } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { HomePage } from '../pages/home/home';
import { MyTabsPage } from '../pages/my-tabs/my-tabs';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = MyTabsPage;
  @ViewChild('myRoot') nav: NavController;
  loginPage :any = LoginPage;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  goToSignIn(){
    this.nav.push(SignUpPage);
  }

  goToLogin(){
    this.nav.push(LoginPage);
  }
}

