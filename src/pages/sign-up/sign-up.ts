import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';

/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  @Input() Email : string;
  @Input() Pwd : string;
  @Input() RePwd : string;
  mycolor:string;
  pwd_state: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams , public toastCtrl:ToastController) {
    this.mycolor = "toolbar";
    this.pwd_state = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Sign-Up-Page');
  }


  goToLogin(){

    if(this.navCtrl.getPrevious().name == "LoginPage"){
       this.navCtrl.pop();
       console.log(this.navCtrl.getPrevious().name);}
    else{
       this.navCtrl.push(LoginPage);
       console.log(this.navCtrl.getPrevious().name);
    }
  }


  goToSignUp(){
    this.navCtrl.push(SignUpPage);
  }

  signInCheck(){


  }

  async pwdCheck(){
      if(this.Pwd == this.RePwd){
        let toast = await  this.toastCtrl.create({
          message: 'Mot de passe Valid',
          duration: 3000,
          position:'top'
        });

        toast.present();
        this.pwd_state = true;
    }else{
      let toast = await  this.toastCtrl.create({
        message: 'les deux mot de passe ne correspondent pas',
        duration: 3000,
        position:'middle'
      });

      toast.present();
      this.pwd_state=false;
    }
  }


}
