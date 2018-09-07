import { Component } from '@angular/core';
import { NavParams, ModalController , AlertController} from 'ionic-angular';
import { HomePage } from '../home/home';
import { AboutModalPage } from '../about-modal/about-modal';
@Component({
  templateUrl: 'tabs.html',
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = HomePage;
  mySelectedIndex: number;
  constructor(navParams: NavParams,public modalCtrl: ModalController, public alertCtrl: AlertController) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }
  openModal() {
    let alert = this.alertCtrl.create({
    title: 'Copy to Social Media',
    inputs: [
      {
        name: 'link',
        value:'www.happiedad.com'
      }
    ],
    buttons: [
        {
          text: 'Cancel'
        }
    ]
    });
    // now present the alert on top of all other content
    alert.present();
  }
  openAbout() {
    let myModal = this.modalCtrl.create(AboutModalPage);
    myModal.present();
  }
}
