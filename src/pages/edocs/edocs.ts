import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController, ModalController } from 'ionic-angular';
import { PostsProvider } from '../../providers/posts/posts';
import { FacultyProvider } from '../../providers/faculty/faculty';
import { CourseProvider } from '../../providers/course/course';
import { ShowReponssePage } from '../show-reponsse/show-reponsse';
import { File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { Downloader, DownloadRequest ,NotificationVisibility } from '@ionic-native/downloader';
import { ShowCommentPage } from '../show-comment/show-comment';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';

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
  allFaculty_: any[];
  allCourses_: any[];
  selectedComments : string = "";
  tabCmt :any = [];
  public static allFaculty :any = [];
  public static allCourse : any = [];
  selectedFaculty:any = "";
  selectedCourse:any = "";
  courseOfFaculty :any = [];
  downloadFile : any;

   file_path :any = 'https://clausthaler-kameruner.com/edocs/files/';

  state : boolean = false;
  postByFaculty :any = [];
  postByCourse : any = [];
  private fileTransfer: FileTransferObject;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
      public postService : PostsProvider ,
      public facultyService : FacultyProvider,
      public courseService : CourseProvider,
      public alertCtrl : AlertController,
      public modalCtrl: ModalController,
      private file: File,
      private transfer: FileTransfer,
      private downloader : Downloader,
      private documentViewer : DocumentViewer ) {

  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad EdocsPage');
  }

  ionViewWillEnter(){

    //get all faculty from api
    this.facultyService.getAllFaculty().subscribe(faculties => {
     EdocsPage.allFaculty = JSON.parse(JSON.stringify(faculties));
     this.allFaculty_ = JSON.parse(JSON.stringify(faculties));
    });

    //get all Course from api
    this.courseService.getAllCourse().subscribe(courses => {
      EdocsPage.allCourse = JSON.parse(JSON.stringify(courses));
      this.allCourses_ = JSON.parse(JSON.stringify(courses));
    });
    //get all post from  api
    this.allPost = this.postService.getAllPost().subscribe(posts => {

      this.data = JSON.parse(JSON.stringify(posts));
      this.allPost = JSON.parse(JSON.stringify(posts));
      console.log(this.allPost);
    });

  }

  async showComments(idPost :any ,post_desc : string ,listComment :any = []){

    let modalComment =  await this.modalCtrl.create(ShowCommentPage ,{ comments : listComment , desc :post_desc ,id_post :idPost},{cssClass : 'designModal'});

    return await modalComment.present();

  }

  async showReponse(idPost:string ,post_description:String,listResponse:any = [] ,selectedFaculty:String , selectedCourse:String){

    let modalResponse =  await this.modalCtrl.create(ShowReponssePage ,{ responses : listResponse , desc :post_description, id_post : idPost, choosedFaculty : selectedFaculty, choosedCourse : selectedCourse }, {cssClass : 'designModal'});

     return await modalResponse.present();
  }

  onSelectFaculty(){

    let i = 0;
    //list all course for this faculty
    console.log(" Slected faculty \t "+EdocsPage.getCodeFacultyByName(this.selectedFaculty));
    this.courseService.getCoursesByFaculty(EdocsPage.getCodeFacultyByName(this.selectedFaculty)).subscribe(courses => {
      this.courseOfFaculty = JSON.parse(JSON.stringify(courses));
      EdocsPage.allCourse = [];
      for(let cours of this.courseOfFaculty){
        let cs : any = {
          code : cours.code,
          title : cours.title,
          createdAt : cours.createdAt,
          codeFaculty : cours.codeFaculty
        };

        EdocsPage.allCourse.push(cs);

      }
      console.log(" Course of faculty "+this.selectedFaculty+" \n"+this.courseOfFaculty);
    });

    EdocsPage.allCourse = ( this.courseOfFaculty.length > 0) ?  this.courseOfFaculty : EdocsPage.allCourse;

    this.postByFaculty = [];

    while( i < this.allPost.length){

      if(this.allPost[i].faculty == this.selectedFaculty)
        this.postByFaculty.push(this.allPost[i]);

      i++;
    }
    if(this.postByFaculty.length > 0)
      this.data = this.postByFaculty;

  }

  onSelectedCourse(){
    let i = 0;
    this.postByCourse = [];
    while( i < this.allPost.length){

      if(this.allPost[i].course == this.selectedCourse)
        this.postByCourse.push(this.allPost[i]);

      i++;
    }
    if(this.postByCourse.length > 0)
      this.data = this.postByCourse;
  }

  /**
   * search and return the code for the given faculty
   * @param title String
   * @returns  code as String
   */
  public static getCodeFacultyByName(title:String){
    let code : string = "";
    for(let faculty of EdocsPage.allFaculty){

      if(faculty.title == title)
        code =  faculty.code;
    }

    return code;
  }

  /**
   * search and return the code of the given course
   * @param title String
   * @returns code as String
   */
  public static getCodeCourseByName(title:String){
    let code : string = "";
    for(let course of EdocsPage.allCourse){

      if(course.title == title)
        code =  course.code;
    }

    return code;
  }

  changeFaculty(faculty:string){
    this.selectedFaculty = faculty;
    this.onSelectFaculty();
  }

  changeCourse(course:string){
    this.selectedCourse = course;
    this.onSelectedCourse();
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
