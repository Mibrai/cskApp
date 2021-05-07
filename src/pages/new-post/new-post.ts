import { Component,Input, OnInit } from '@angular/core';
import { FileTransferObject } from '@ionic-native/file-transfer';
import { IonicPage, NavController, NavParams, Platform , ToastController, AlertController} from 'ionic-angular';
import { File } from '@ionic-native/file';
import { HttpClient } from '@angular/common/http';
import { FormBuilder , FormGroup } from '@angular/forms';
import { EdocsPage } from '../edocs/edocs';

/**
 * Generated class for the NewPostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-post',
  templateUrl: 'new-post.html',
})
export class NewPostPage implements OnInit {

  @Input() title : string;
  @Input() description : string;
  @Input() file : any;
  @Input() myFile : File;

  form :  FormGroup;
  file_ : File;
  platformStatus: boolean = false;
  file_path :any = 'https://clausthaler-kameruner.com/edocs/files/';
  fileEndPoint :any = 'https://clausthaler-kameruner.com/edocs/api/apiPost/addPost.php';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private platform : Platform,
    public http : HttpClient,
    public fb: FormBuilder,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController) {

      this.form = this.fb.group({name: [''], content: [null]})

      this.title = "";
      this.description = "";

      if(this.platform.is('ios'))
        this.platformStatus = true;

      if(this.platform.is('android'))
        this.platformStatus = true;
  }
  ngOnInit(): void {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewPostPage');
  }

  close(){
    this.navCtrl.pop();
  }


  submitForm(){
    if( this.title == ""  && this.description == "" ) {
      const alert = this.alertCtrl.create({
        title: 'Feedback ',
        subTitle: 'Renseignez soit le titre soit la decsription \n ',
        buttons: ['OK']
      });
      alert.present();
    } else {

      //Get current time
      let today = new Date();
      var dd = String(today.getDate());
      var mm = String(today.getMonth() + 1); //January is 0!
      var yyyy = today.getFullYear();

      console.log("fichier selectionne : "+this.file.name);
      var formData: any = new FormData();
      formData.append("name", this.form.get('name').value);
      formData.append("content", this.file);
      formData.append("principalPostId",this.navParams.get('post_id'));
      formData.append("codeFaculty",EdocsPage.getCodeFacultyByName(this.navParams.get('choosedFaculty')));
      formData.append("codeCourse",EdocsPage.getCodeCourseByName(this.navParams.get('choosedCourse')));
      formData.append("facultyTitle",this.navParams.get('choosedFaculty'));
      formData.append("courseTitle",this.navParams.get('choosedCourse'));
      formData.append("postDate",dd+"-"+mm+"-"+yyyy);
      formData.append("title",this.title);
      formData.append("description",this.description);
      formData.append("idMember","4");
      formData.append("postTime",String(today.getHours())+" : "+String(today.getMinutes()));
      formData.append("fileDestination","../../files/"+this.navParams.get('choosedFaculty')+"/"+this.navParams.get('choosedCourse'));

      this.http.post(this.fileEndPoint, formData).subscribe(
        (response) => {
          console.log("Response api post : "+response);
          const toast = this.toastCtrl.create({
            message: 'le fichier '+this.file.name+' envoye',
            duration: 3000
          });
          toast.present();
        },
        (error) => console.log("Error response  "+JSON.stringify(error))
      )
    }


  }



  uploadFileApi(event) {
    const file = (event.target as HTMLInputElement).files[0];
    console.log("My File "+file.name);
    this.file = file;
    this.form.patchValue({ content: file});
    this.form.get('content').updateValueAndValidity()
  }
}
