import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from "@ionic-native/file";
import { HTTP } from '@ionic-native/http/ngx';
import { Downloader} from '@ionic-native/downloader';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { FileChooser } from '@ionic-native/file-chooser';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { SingleChatPage } from '../pages/single-chat/single-chat';
import { MyTabsPage } from '../pages/my-tabs/my-tabs';
import { PostsProvider } from '../providers/posts/posts';
import { AnnoncesProvider } from '../providers/annonces/annonces';
import { FacultyProvider } from '../providers/faculty/faculty';
import { CourseProvider } from '../providers/course/course';
import { ShowReponssePage } from '../pages/show-reponsse/show-reponsse';
import { ShowCommentPage } from '../pages/show-comment/show-comment';
import { ChatsProvider } from '../providers/chats/chats';
import { NewPostPage } from '../pages/new-post/new-post';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignUpPage,
    ShowReponssePage,
    ShowCommentPage,
    MyTabsPage,
    SingleChatPage,
    NewPostPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignUpPage,
    ShowReponssePage,
    ShowCommentPage,
    MyTabsPage,
    SingleChatPage,
    NewPostPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    PostsProvider,
    AnnoncesProvider,
    FacultyProvider,
    CourseProvider,
    ChatsProvider,
    File,
    HTTP,
    FileTransfer,
    FileTransferObject,
    Downloader,
    DocumentViewer,
    FileChooser
  ]
})
export class AppModule { }
