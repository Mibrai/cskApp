import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PostsProvider } from '../../providers/posts/posts';

/**
 * Generated class for the ShowCommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-show-comment',
  templateUrl: 'show-comment.html',
})
export class ShowCommentPage {

  idPost : any;
  desc_post : string = "";
  comments : any = [];
  newCmt : any;
  mycolor : any = "light";
  myicon :any = "send-outline";
  myradius : any ="0%";
  txtradius : any = "0%";
  txtborder : any = "none";

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public postService: PostsProvider) {

    this.desc_post = navParams.get('desc');
    this.comments = navParams.get('comments');
    this.idPost = navParams.get('id_post');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowCommentPage');
  }

  close(){
    this.navCtrl.pop();
  }
  onChange() {
    if(this.newCmt.length > 0 ){
      this.mycolor ="toolbar";
      this.myradius = "50%";
      this.txtradius = "5%";
      this.txtborder = "1px solid green";
    }else{
      this.txtborder = "none";
      this.txtradius = "0%";
      this.mycolor = "light";
    }

  }

  onBlur(){

    if(this.newCmt.length <= 0 ){
      this.txtborder = "none";
      this.txtradius = "0%";
      this.mycolor = "light";
    }

  }

  addComment(){
      if(this.newCmt != null && this.idPost != null)
        this.postService.addComment(this.idPost,'7',this.newCmt);
    }




}
