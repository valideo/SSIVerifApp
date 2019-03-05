
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { NativeStorage } from '@ionic-native/native-storage';

//Pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RapportPage } from './../pages/rapport/rapport';
import { EditClientPage } from '../pages/edit-client/edit-client';
import { AccessModulesPage } from './../pages/access-modules/access-modules';
import { UserInfosPage } from './../pages/user-infos/user-infos';

//Providers
import { RestProvider } from '../providers/rest/rest';
import { PdfProvider } from './../providers/pdf/pdf';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RapportPage,
    EditClientPage,
    AccessModulesPage, 
    UserInfosPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RapportPage, 
    EditClientPage, 
    AccessModulesPage,
    UserInfosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
   SocialSharing,
   PdfProvider,
   FileOpener,
   File,
   NativeStorage
  ]
})
export class AppModule {}
