import { Component, OnInit } from '@angular/core';
import { Sport } from 'src/app/models/Sport';
import { Match } from 'src/app/models/Match';

import { FeedService } from 'src/app/services/feed.service';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  token: string = ""
  sportNuggets: Sport[] = []

  feedMatches: Match[] = []

  constructor(private feed: FeedService, public router: Router, public route: ActivatedRoute) {
    
   }

  ngOnInit() {
    // @ts-ignore
    this.token = localStorage.getItem('token')   
    this.getFeed();
    this.sportNuggets = this.getSportList();
    
  }


  getFeed(){
    this.feed.getMainFeed().subscribe((newPosts: Object) => {
      // @ts-ignore
      let matchList = newPosts['feed_matches']
      for (let num = 0; num < matchList.length; num++) {
        this.feedMatches.push(matchList[num]);
      }
    }, (error: any) => {
      console.log(error);
    })
  }

  gotoMatch(id: number) {
    this.router.navigate(['/tabs/match'], { queryParams: { matchId: id} });
  }

  handleRefresh() {
    setTimeout(() => {
      // Any calls to load data go here
      //event.target.complete();
    }, 2);
  };


  getSportList(){
    const sportsList: Sport[] = [
      { 
        name: 'futbol',
        icon: '../../../assets/icon/sports_soccer.svg'
      },
      { 
        name: 'basquet',
        icon: '../../../assets/icon/sports_basketball.svg'
      },
      { 
        name: 'tennis',
        icon: '../../../assets/icon/sports_tennis.svg'
      },
      { 
        name: 'volleyball',
        icon: '../../../assets/icon/sports_volleyball.svg'
      },

    ]
    return sportsList;
  }
}
