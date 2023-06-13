import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from "@angular/common";
import { Match } from 'src/app/models/Match';
import { MatchService } from 'src/app/services/match.service';
import { SmallUser } from 'src/app/models/SmallUser';
import { async } from 'rxjs';

@Component({
  selector: 'app-match',
  templateUrl: './match.page.html',
  styleUrls: ['./match.page.scss'],
})
export class MatchPage implements OnInit {

  selectedTab: string = 'info';
  matchId:number = 0;
  matchInfo: Match= {
    id: 0,
    title:'none',
    description: "none",
    location:"none",
    city: "none",
    date:"none",
    numPlayers: 0,
    sport: "none",
    ongoing: 0,
    owner_id: "none"
  };
  token: string = "";

  isOngoing: boolean = true;
  isOwner: boolean = false;
  isJoined: boolean = false;

  team1: SmallUser[] = []
  ownerUsername:string = ""

  constructor(public router: Router, public route: ActivatedRoute, private location: Location, private matchService: MatchService) {
    this.route.queryParamMap.subscribe(params => {
      let id = params.get('matchId');
      if (id) {
        let mId = parseInt(id);
        this.matchId = parseInt(id);
        // @ts-ignore
        this.getMatch(mId) 
        this.getPlayers(mId)
      }      
    })    
   }

  ngOnInit() {    
  }

  finishGame(winner: number) {
    console.log(this.team1[winner].id)
    this.isOngoing = false
    
  }


  changeJoin(){

    if(this.isJoined){
      this.matchService.leaveMatch(this.matchId).subscribe(
        (response) => {  
          this.isJoined = !this.isJoined;   
          this.team1 = []
          this.getPlayers(this.matchId);  
        },
        err => {
          console.error('Error: status = ', err.status, ' and statusText = ', err.statusText)
          alert('Cannot fetch match users')
        });      

    }else{
      this.matchService.joinMatch(this.matchId).subscribe(
        (response) => {  
          this.isJoined = !this.isJoined  
          this.team1 = []          
          this.getPlayers(this.matchId);  
        },
        err => {
          console.error('Error: status = ', err.status, ' and statusText = ', err.statusText)
          alert('Cannot Join')
        });     
      
    }
    
    
  }

  getMatch(id: number) {
    
    this.matchService.getMatch(id).subscribe(
      (match) => {
        // @ts-ignore
        this.matchInfo = match['match']
        this.isOwner = (this.matchInfo.owner_id == localStorage.getItem('user_id'))   
        this.isOngoing =  (this.matchInfo.ongoing == 1)
        console.log(this.isOngoing )
      },
      err => {
        console.error('Error: status = ', err.status, ' and statusText = ', err.statusText)
        alert('Cannot fetch match data')
      })


  }

  getPlayers(id: number) {
    this.matchService.getMatchPlayers(id).subscribe(
      (players) => {
        // @ts-ignore
        let playerList = players['match_players']
        for (let num = 0; num < playerList.length; num++) {
          this.team1.push(playerList[num]);          
          if(playerList[num].id == localStorage.getItem('user_id')){
            this.isJoined = true;
          }
          this.ownerUsername = this.team1[0].username;

        }
        
      },
      err => {
        console.error('Error: status = ', err.status, ' and statusText = ', err.statusText)
        alert('Cannot fetch match users')
      })
  }
  
  goBack(): void {
    this.location.back();
  }
  segmentChanged(ev: any) {
    
  }
  selectTab(tabName: string){
    this.selectedTab = tabName;
  }
}
