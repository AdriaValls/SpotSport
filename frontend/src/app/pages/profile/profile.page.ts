import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from "@angular/common";
import { Match } from 'src/app/models/Match';
import { FeedService } from 'src/app/services/feed.service';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  selectedTab: string = 'upcoming';

  JoinedMatches: Match[] = []
  OwnedMatches: Match[] = []

  user: User= {
    id: 0,
    username: "username",
    is_admin: 0,
    email: "email",
    description: "description",
  };
  

  constructor(public router: Router, public route: ActivatedRoute, private feed: FeedService, private location: Location, private userService:UserService) { 

    const id = localStorage.getItem('user_id')
    if(id){      
      this.loadJoinedMatches(parseInt(id));
      this.loadOwnedMatches(parseInt(id));
      this.loadUser(parseInt(id))
    }
    
  }

  ngOnInit() {    
  }

  loadUser(id: number){
    this.userService.getUserInfo(id).subscribe((userinfo: Object) => {
      // @ts-ignore
      this.user = userinfo['user']
    }, (error: any) => {
      console.log(error);
    })
  }

  loadJoinedMatches(id: number){
    this.feed.getJoinedMatches(id).subscribe((newPosts: Object) => {
      // @ts-ignore
      let matchList = newPosts['joined_matches']
      for (let num = 0; num < matchList.length; num++) {
        this.JoinedMatches.push(matchList[num]);
      }
    }, (error: any) => {
      console.log(error);
    })
  }

  loadOwnedMatches(id: number){
    this.feed.getOwnedMatches(id).subscribe((newPosts: Object) => {
      // @ts-ignore
      let matchList = newPosts['owned_matches']
      for (let num = 0; num < matchList.length; num++) {
        this.OwnedMatches.push(matchList[num]);
      }
    }, (error: any) => {
      console.log(error);
    })
  }

  gotoMatch(id: number) {
    this.router.navigate(['/tabs/match'], { queryParams: { matchId: id} });
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }
  selectTab(tabName: string){
    this.selectedTab = tabName;
  }

  goBack(): void {
    this.location.back();
  }


}
