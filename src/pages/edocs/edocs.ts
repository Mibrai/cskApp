import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController, ModalController } from 'ionic-angular';
import { PostsProvider } from '../../providers/posts/posts';
import { FacultyProvider } from '../../providers/faculty/faculty';
import { CourseProvider } from '../../providers/course/course';
import { ShowReponssePage } from '../show-reponsse/show-reponsse';

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
  allFaculty :any = [];
  allCourse : any = [];
  selectedFaculty:any = "";
  selectedCourse:any = "";
  courseOfFaculty :any = [];

  state : boolean = false;
  postByFaculty :any = [];
  postByCourse : any = [];

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
      public postService : PostsProvider ,
      public facultyService : FacultyProvider,
      public courseService : CourseProvider,
      public alertCtrl : AlertController,
      public modalCtrl: ModalController ) {

  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad EdocsPage');
  }

  ionViewWillEnter(){

    //get all faculty from api
    this.facultyService.getAllFaculty().subscribe(faculties => {
     this.allFaculty = JSON.parse(JSON.stringify(faculties));
    });

    //get all Course from api
    this.courseService.getAllCourse().subscribe(courses => {

      this.allCourse = JSON.parse(JSON.stringify(courses));
    });
    //get all post from  api
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

  async showReponse(post_description:String,listResponse:any = []){

    let modalResponse =  await this.modalCtrl.create(ShowReponssePage ,{ responses : listResponse , desc :post_description });

     return await modalResponse.present();
  }

  onSelectFaculty(){

    let i = 0;
    //list all course for this faculty
    console.log(" Slected faculty \t "+this.getCodeFacultyByName(this.selectedFaculty));
    this.courseService.getCoursesByFaculty(this.getCodeFacultyByName(this.selectedFaculty)).subscribe(courses => {
      this.courseOfFaculty = JSON.parse(JSON.stringify(courses));
      this.allCourse = [];
      for(let cours of this.courseOfFaculty){
        let cs : any = {
          code : cours.code,
          title : cours.title,
          createdAt : cours.createdAt,
          codeFaculty : cours.codeFaculty
        };

        this.allCourse.push(cs);

      }
      console.log(" Course of faculty "+this.selectedFaculty+" \n"+this.courseOfFaculty);
    });

    this.allCourse = ( this.courseOfFaculty.length > 0) ?  this.courseOfFaculty : this.allCourse;

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

  getCodeFacultyByName(name:String){
    let code : string = "";
    for(let faculty of this.allFaculty){

      if(faculty.title == name)
        code =  faculty.code;
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

}
