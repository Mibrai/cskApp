import { Component ,Input} from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SignUpPage } from '../sign-up/sign-up';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @Input() Email : string;
  @Input() Pwd : string;
  mycolor:string;
  constructor(public navCtrl: NavController, public navParams: NavParams , public alertCtrl:AlertController) {
    this.mycolor = "toolbar";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  goToHomme(){
    this.navCtrl.push(HomePage);
  }

  goToLogin(){
    this.navCtrl.push(LoginPage);
  }

  goToSignUp(){
    if(this.navCtrl.getPrevious().name == "SignUpPage")
      this.navCtrl.pop();
   else
      this.navCtrl.push(SignUpPage);

  }

  async loginCheck(){
      if(this.Email != "" && this.Pwd != ""){
        const alert = await this.alertCtrl.create({
          cssClass:'success',
          message:'Identifiants Valide !',
          buttons:[
            {
              text:'Okey',
              role:'cancel',
              cssClass:'secondary'
            }
          ]
        });
        await alert.present();
      }else{

        const alert = await this.alertCtrl.create({
          cssClass:'danger',
          message:'Veuillez fournir vos identifiants !',
          buttons:[
            {
              text:'Fermer',
              role:'cancel',
              cssClass:'danger'
            }
          ]
        });
        await alert.present();

      }
  }
}
