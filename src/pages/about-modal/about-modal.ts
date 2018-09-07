import { Component } from '@angular/core';
import { NavParams, ViewController} from 'ionic-angular';

@Component({
  selector: 'page-about-modal',
  templateUrl: 'about-modal.html'
})
export class AboutModalPage {

  constructor(public navParams: NavParams, public viewCtrl: ViewController)  {}

  closeModal() {
    this.viewCtrl.dismiss();
  }

}
