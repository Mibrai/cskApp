import { Component ,Input} from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController, ViewController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { MyTabsPage } from '../my-tabs/my-tabs';
import { HttpClient } from '@angular/common/http';
import { FormBuilder , FormGroup } from '@angular/forms';
import { SignUpPage } from '../sign-up/sign-up';
import { EdocsPage } from '../edocs/edocs';

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

  @Input() login : string;
  @Input() pwd : string;
  mycolor:string;
  form :  FormGroup;
  public static current_user: any = [];
  checkUserEndpoint :any = 'https://clausthaler-kameruner.com/edocs/api/apiLogin/checkUser.php';

  constructor(public navCtrl: NavController,
    public navParams: NavParams ,
    public alertCtrl:AlertController,
    public viewCtrl : ViewController,
    public fb: FormBuilder,
    public http : HttpClient) {

      this.form = this.fb.group({name: [''], content: [null]})
      this.login = "";
      this.pwd = "";
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
      if(this.login != "" && this.pwd != ""){
        var formData: any = new FormData();
        formData.append("i_login",this.login);
        formData.append("i_pwd",this.pwd);

        this.http.post(this.checkUserEndpoint,formData).subscribe((response) => {
          let res = JSON.parse(JSON.stringify(response));

          if(res.id != null){
            LoginPage.current_user = res;
            const alertResponse =  this.alertCtrl.create({
              cssClass:'danger',
              message:'Hey '+res.surname+' '+res.name+' !!',
              buttons:[
                {
                  text:' Go> ',
                  role:'cancel',
                  cssClass:'danger',
                  handler: data => {
                    this.navCtrl.push(MyTabsPage);
                  }
                }
              ]
            });
             alertResponse.present();
          }else{
            const alertResponse =  this.alertCtrl.create({
              cssClass:'danger',
              message:'Error : '+res.msg,
              buttons:[
                {
                  text:'Fermer',
                  role:'cancel',
                  cssClass:'danger'
                }
              ]
            });
             alertResponse.present();
          }
        },
        (error) => console.log("Error response : "+JSON.stringify(error)));
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
