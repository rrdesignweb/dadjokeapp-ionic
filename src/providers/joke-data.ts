import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { UserData } from './user-data';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class JokeData {
  data: any;
  constructor(public http: Http, public user: UserData) { }
  load(): any {
    if (this.data) {
      return Observable.of(this.data);
    } else {
      return this.http.get('assets/data/data.json')
        .map(this.processData, this);
    }
  }
  processData(data: any) {
    this.data = data.json();
    return this.data;
  }
  getTimeline(dayIndex: number, queryText = '', segment = 'all') {
    return this.load().map((data: any) => {
      let day = data.jokelist[dayIndex];
      day.shownSessions = 0;

      queryText = queryText.toLowerCase().replace(/,|\.|-/g, ' ');
      let queryWords = queryText.split(' ').filter(w => !!w.trim().length);

      day.groups.forEach((group: any) => {
        group.hide = true;

        group.jokes.forEach((joke: any) => {
          // check if this joke should show or not
          this.filterSession(joke, queryWords, segment);

          if (!joke.hide) {
            // if this joke is not hidden then this group should show
            group.hide = false;
            day.shownSessions++;
          }
        });

      });

      return day;
    });
  }

  filterSession(joke: any, queryWords: string[], segment: string) {

    let matchesQueryText = false;
    if (queryWords.length) {
      // of any query word is in the joke name than it passes the query test
      queryWords.forEach((queryWord: string) => {
        if (joke.name.toLowerCase().indexOf(queryWord) > -1 || joke.topic.toLowerCase().indexOf(queryWord) > -1) {
          matchesQueryText = true;
        }
      });
    } else {
      // if there are no query words then this joke passes the query test
      matchesQueryText = true;
    }
    // if the segement is 'favorites', but joke is not a user favorite
    // then this joke does not pass the segment test
    let matchesSegment = false;
    if (segment === 'favorites') {
      if (this.user.hasFavorite(joke.name)) {
        matchesSegment = true;
      }
    } else {
      matchesSegment = true;
    }
    // all tests must be true if it should not be hidden
    joke.hide = !(matchesQueryText && matchesSegment);
  }

}
