import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

/*
  Generated class for the PostsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const ALL_POST_API_URL = 'https://clausthaler-kameruner.com/edocs/api/apiPost/';
const ADD_CMT_API_URL = 'https://clausthaler-kameruner.com/edocs/api/apiPost/addComment.php';
const ALL_POST_TO_POST_CONNEXION_API_URL = 'https://clausthaler-kameruner.com/edocs/api/apiPost/allPostToPostConnexion.php';
const ALL_BASIC_POST_API_URL = 'https://clausthaler-kameruner.com/edocs/api/apiPost/allBasicPost.php';
@Injectable()
export class PostsProvider {

  constructor(public http: HttpClient,
    private alertCtrl : AlertController) {
    console.log('Hello PostsProvider Provider');
  }

  getAllPost(){
    return this.http.get(`${ALL_POST_API_URL}`);
  }

  getAllBasicPost(){
    return this.http.get(`${ALL_BASIC_POST_API_URL}`);
  }

  getAllPostToPostConnexion(){
    return this.http.get(`${ALL_POST_TO_POST_CONNEXION_API_URL}`);
  }

  addComment(idPost:string, idUser:string,cmt :string){

    /*let header = { headers: {
      "Content-Type": "application/json"
    } };*/
    let data_ : any =    JSON.stringify({
      'comment': cmt,
      'idPost' : idPost,
      'idMember' : idUser
    });
    this.http.post(`${ADD_CMT_API_URL}`, data_).subscribe(response => {
        console.log(JSON.parse(JSON.stringify(response)));
        let alert = this.alertCtrl.create({
          title: 'Status!',
          message: '<ion-item><ion-label><span>Nouveau commentaire ajoute </span><ion-icon \'name=thumbs-up-outline\'></ion-icon></ion-label></ion-item>',
          buttons: [{
            text : 'Ok',
            role : 'cancel',
            cssClass : 'designAlertBtn'
          }]
        });

        alert.present();
    });
  }

}
