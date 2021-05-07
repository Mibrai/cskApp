import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,ModalController } from 'ionic-angular';
import { NewPostPage } from '../new-post/new-post';
import { File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { Downloader, DownloadRequest ,NotificationVisibility } from '@ionic-native/downloader';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';

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
  idPost :any;
  selectedFaculty : any;
  selectedCourse : any;
  downloadFile : any;

  file_path :any = 'https://clausthaler-kameruner.com/edocs/files/';

  private fileTransfer: FileTransferObject;

  constructor(public navCtrl: NavController,
    public navParams: NavParams ,
     public alertCtrl: AlertController,
     private modalCtrl : ModalController,
     private file: File,
     private transfer: FileTransfer,
     private downloader : Downloader,
     private documentViewer : DocumentViewer) {
    this.desc_post = navParams.get('desc');
    this.reponses = navParams.get('responses');
    this.idPost = navParams.get('id_post');
    this.selectedFaculty = navParams.get('choosedFaculty');
    this.selectedCourse = navParams.get('choosedCourse');
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

//add new Post
async formPost(){
  let modalResponse =  await this.modalCtrl.create(NewPostPage ,{ post_id : this.idPost , choosedFaculty : this.selectedFaculty, choosedCourse : this.selectedCourse },{cssClass : 'designModal'});

    return await modalResponse.present();
  }

  onDownloadFile(urlFile:String){

    let url = encodeURI(this.file_path+urlFile);
    this.fileTransfer = this.transfer.create();

    console.log(" Url file = "+this.file_path+urlFile);
    this.fileTransfer.download(url, this.file.dataDirectory + urlFile, true).then((entry) => {
      //here logging our success downloaded file path in mobile.
      console.log('download completed: ' + entry.toURL());

      let alert = this.alertCtrl.create({
       title: 'Download Success',
       message: this.file.dataDirectory+urlFile,
       buttons: [{
         text : 'Ok',
         role : 'cancel',
         cssClass : 'designAlertBtn'
       }]
     });
     alert.present();
      // open downloaded file
      this.downloadFile = entry.toURL();

    }).catch((error) => {
      //here logging an error.
      let alert = this.alertCtrl.create({
       title: 'Download Error',
       message: JSON.stringify(error),
       buttons: ['Cancel']
     });
     alert.present();
      console.log('download failed: ' + JSON.stringify(error));
    });


   }

   downloadHandler(urlFile:string) {
     // To download the PDF file
       this.onDownloadFile(urlFile);
       let request: DownloadRequest = {
         uri: this.file_path+urlFile,
         title: 'CskApp Download '+urlFile,
         description: '',
         mimeType: '',
         visibleInDownloadsUi: true,
         notificationVisibility: NotificationVisibility.VisibleNotifyCompleted,
         destinationInExternalFilesDir: {
             dirType: 'Downloads',
             subPath: urlFile
         }
     };

     this.downloader.download(request)
     .then((location: string) => {
       console.log('File downloaded at:'+location);
       this.openFile(location);
     })
     .catch((error: any) => console.error(error));

     }

     openFile(path : string){
       const options : DocumentViewerOptions = {
         title : "CSK Doc Viewer"
       }
       this.documentViewer.viewDocument(path,'application/pdf',options);
     }

}
