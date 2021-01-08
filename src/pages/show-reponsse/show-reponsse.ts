import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the ShowReponssePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-show-reponsse',
  templateUrl: 'show-reponsse.html',
})
export class ShowReponssePage {

  desc_post : string = "";
  reponses : any = [];
  selectedComments : string = "";
  tabCmt :any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams , public alertCtrl: AlertController) {
    this.desc_post = navParams.get('desc');
    this.reponses = navParams.get('responses');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowReponssePage');
  }

  close(){
    this.navCtrl.pop();
  }

  showComments(listComment :any = []){

    console.log(" list of all comments : \n "+listComment);
    this.tabCmt = listComment;
    //this.selectedComments += "<div class='form_cmt'><ion-list><ion-item><ion-textarea placeholder='Entrez votre commentaire ici'></ion-textarea></ion-item><ion-item><button ion-button color='secondary' icon-only><ion-icon name='arrow-forward-circle-outline'></ion-icon></button></ion-item></ion-list></div>";
    let i = 0;
    while( i < this.tabCmt.length){
      this.selectedComments += "<div class='designAlert'> <ion-card> <ion-card-header class='card_header'> <ion-card-title> <div class='class_autor'> <img src='../../assets/imgs/bill.jpg' /><span>"+this.tabCmt[i].autor+"</span></div> </ion-card-title> </ion-card-header> <ion-card-content style='display: block;'><ion-item> <ion-label>"+this.tabCmt[i].content+" </ion-label></ion-item> <p>&nbsp;</p> <ion-item class='createdAt'><ion-label class='footer_alert'> "+this.tabCmt[i].createdAt+" </ion-label></ion-item> </ion-card-content> </ion-card> </div>";
      i++;
    }

   // this.selectedComments += "</div>";
    let alertCmt = this.alertCtrl.create({
      title:'Commentaires',
      cssClass: 'designAlert ,createdAt,class_autor,card_header,footer_alert ,form_cmt',
      message: this.selectedComments,
      inputs:[
        {
          name:'cmt',
          type: 'textarea',
          placeholder:'Entrez votre commentaire ici...'
        }
      ],
      buttons: [
        {
          text: 'Poster',
          role: 'ok',
          cssClass:'designAlertBtn',
          handler: (alertData) => {
            console.log(" Input \n"+alertData.cmt);
          }
        },
        {
          text: 'Fermer',
          role: 'cancel',
          cssClass: 'designAlertBtn',
          handler: () => {
            this.selectedComments = "";
          }
        }
      ]
    });

    alertCmt.present();


}

}
