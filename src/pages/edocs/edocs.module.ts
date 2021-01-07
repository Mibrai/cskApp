import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EdocsPage } from './edocs';

@NgModule({
  declarations: [
    EdocsPage,
  ],
  imports: [
    IonicPageModule.forChild(EdocsPage),
  ],
})
export class EdocsPageModule {}
