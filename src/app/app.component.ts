import { Component, ViewChild } from '@angular/core';
import { Events, MenuController, Nav, Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { JokeData } from '../providers/joke-data';
import { UserData } from '../providers/user-data';

export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}
@Component({
  templateUrl: 'app.template.html'
})
export class JokeApp {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  public constructor(
    public events: Events,
    public userData: UserData,
    public menu: MenuController,
    public platform: Platform,
    public jokeData: JokeData,
    public splashScreen: SplashScreen
  ) {
      jokeData.load();
      this.platformReady();
      this.rootPage = TabsPage;
  }
  openApp() {
    this.nav.setRoot(TabsPage);
  }
  platformReady() {
    this.platform.ready().then(() => {
      this.splashScreen.hide();
    });
  }
}
