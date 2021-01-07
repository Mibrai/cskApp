import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  rootPage :string;
  mycolor:string;



  constructor(public navCtrl: NavController) {
    this.mycolor = "toolbar";

  }

  goToLogin(){
    //this.navCtrl.push(LoginPage);
  }



  goToSignUp(){
   // this.navCtrl.push(SignUpPage);
  }
}
