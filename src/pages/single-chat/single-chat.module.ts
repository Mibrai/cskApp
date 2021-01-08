import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SingleChatPage } from './single-chat';

@NgModule({
  declarations: [
    SingleChatPage,
  ],
  imports: [
    IonicPageModule.forChild(SingleChatPage),
  ],
})
export class SingleChatPageModule {}
