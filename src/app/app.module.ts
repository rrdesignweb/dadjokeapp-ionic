import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';

import { IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen  } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';
import { ConferenceApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { AboutModalPage } from '../pages/about-modal/about-modal';
import { ScheduleFilterPage } from '../pages/schedule-filter/schedule-filter';
import { TabsPage } from '../pages/tabs/tabs';

import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';

@NgModule({
  declarations: [
    ConferenceApp,
    HomePage,
    ScheduleFilterPage,
    AboutModalPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(ConferenceApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ConferenceApp,
    HomePage,
    ScheduleFilterPage,
    AboutModalPage,
    TabsPage
  ],
  providers: [
    Storage,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ConferenceData,
    UserData,
    InAppBrowser,
    SplashScreen
  ]
})
export class AppModule { }
