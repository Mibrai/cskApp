import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {HttpClientModule} from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { AnnoncePage } from '../pages/annonce/annonce';
import { ChatsPage } from '../pages/chats/chats';
import { EdocsPage } from '../pages/edocs/edocs';
import { SettingsPage } from '../pages/settings/settings';
import { MyTabsPage } from '../pages/my-tabs/my-tabs';
import { PostsProvider } from '../providers/posts/posts';
import { AnnoncesProvider } from '../providers/annonces/annonces';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignUpPage,
    MyTabsPage
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
    MyTabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PostsProvider,
    AnnoncesProvider
  ]
})
export class AppModule {}
