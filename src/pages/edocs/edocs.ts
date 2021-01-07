import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController } from 'ionic-angular';
import { PostsProvider } from '../../providers/posts/posts';

/**
 * Generated class for the EdocsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edocs',
  templateUrl: 'edocs.html',
})
export class EdocsPage {
  data:any = [];
  str:any;
  allPost: any = [];
  selectedComments : string = "";
  tabCmt :any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public postService : PostsProvider , public alertCtrl : AlertController ) {

  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad EdocsPage');

  }

  ionViewWillEnter(){
    this.allPost = this.postService.getAllPost().subscribe(posts => {

      console.log("Element \n");

      this.data = JSON.parse(JSON.stringify(posts));
      this.allPost = JSON.parse(JSON.stringify(posts));
      console.log(this.allPost);
    });

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
          },
          {
            name:'btn_send',
            type:'submit',
            value:'poster'
          }
        ],
        buttons: [
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
