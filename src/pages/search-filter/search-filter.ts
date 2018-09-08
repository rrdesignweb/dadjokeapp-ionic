import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { JokeData } from '../../providers/joke-data';
@Component({
  selector: 'page-schedule-filter',
  templateUrl: 'search-filter.html'
})
export class SearchFilterPage {
  constructor(
    public jokeData:JokeData,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
  }
  dismiss(data?: any) {
    this.viewCtrl.dismiss(data);
  }
}
