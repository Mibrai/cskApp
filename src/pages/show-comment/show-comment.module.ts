import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowCommentPage } from './show-comment';

@NgModule({
  declarations: [
    ShowCommentPage,
  ],
  imports: [
    IonicPageModule.forChild(ShowCommentPage),
  ],
})
export class ShowCommentPageModule {}
