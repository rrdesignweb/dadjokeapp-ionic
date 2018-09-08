import { Component, ViewChild, Injectable } from '@angular/core';
import { AlertController, App, ItemSliding, List, ModalController, NavController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { JokeData } from '../../providers/joke-data';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
@Injectable()
export class HomePage {

  @ViewChild('scheduleList', { read: List }) scheduleList: List;

  dayIndex = 0;
  queryText = '';
  segment = 'all';

  shownSessions: any = [];
  groups: any = [];
  confDate: string;
  array:any = [];
  items: any;
  constructor(
    public alertCtrl: AlertController,
    public app: App,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public jokeData: JokeData,
    public user: UserData,
    public storage: Storage
  ) {
    //Storage get
    this.storage.get('myStore').then((data) => {
      this.items = data;
      console.log('All my favs are: '+data);
    });
  }
  ionViewDidLoad() {
    this.app.setTitle("Happie Dad! So Dad It's Good");
    this.updateSchedule();
  }
  updateSchedule() {
    this.scheduleList && this.scheduleList.closeSlidingItems();
    this.jokeData.getTimeline(this.dayIndex, this.queryText, this.segment).subscribe((data: any) => {
      this.shownSessions = data.shownSessions;
      this.groups = data.groups;
    });
  }
  addFavorite(slidingItem: ItemSliding, sessionData: any, no:any) {
    if (this.user.hasFavorite(sessionData.name)) {
      console.log('hello');
    } else {
      this.user.addFavorite(sessionData.name);

      console.log('Just added: '+sessionData.name);

      this.storage.get('myStore').then((data) => {
        if(data != null)
        {
          data.push(sessionData.name);
          this.storage.set('myStore', data);
        } else {
          this.array.push(sessionData.name);
          this.storage.set('myStore', this.array);
        }
      });
      let alert = this.alertCtrl.create({
        title: 'Favourite Added',
        buttons: [{
          text: 'OK',
          handler: () => {
            slidingItem.close();
          }
        }]
      });
      alert.present();
    }
  }
  removeFavorite(slidingItem: ItemSliding, sessionData: any, no:any) {

    let alert = this.alertCtrl.create({
      title: 'Remove Favourite',
      message: 'Would you like to remove this Joke from your favourites?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            slidingItem.close();
          }
        },
        {
          text: 'Remove',
          handler: () => {
            // they want to remove this session from their favorites
            // this.user.removeFavorite(sessionData);
            this.storage.get('myStore').then((data) => {
                data.splice(no,+1);
                this.storage.set('myStore', data);
            });
            console.log("item deleted: "+this.items[no]);
            this.items.splice(no,1);
            this.updateSchedule();
            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        }
      ]
    });
    // now present the alert on top of all other content
    alert.present();
  }
  openModal() {
    let alert = this.alertCtrl.create({
      message: 'Would you like to remove this Joke from your favourites?',
      buttons: [
        {
          text: 'Cancel',
        }
      ]
    });
    // now present the alert on top of all other content
    alert.present();
  }
}
