import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';

import { IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen  } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';
import { JokeApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { AboutModalPage } from '../pages/about-modal/about-modal';
import { SearchFilterPage } from '../pages/search-filter/search-filter';
import { TabsPage } from '../pages/tabs/tabs';

import { JokeData } from '../providers/joke-data';
import { UserData } from '../providers/user-data';

@NgModule({
  declarations: [
    JokeApp,
    HomePage,
    SearchFilterPage,
    AboutModalPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(JokeApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    JokeApp,
    HomePage,
    SearchFilterPage,
    AboutModalPage,
    TabsPage
  ],
  providers: [
    Storage,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    JokeData,
    UserData,
    InAppBrowser,
    SplashScreen
  ]
})
export class AppModule { }
