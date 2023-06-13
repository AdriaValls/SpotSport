import { Component, OnInit } from '@angular/core';
import { Sport } from 'src/app/models/Sport';
import { Match } from 'src/app/models/Match';
import { MatchService } from 'src/app/services/match.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-match',
  templateUrl: './create-match.page.html',
  styleUrls: ['./create-match.page.scss'],
})
export class CreateMatchPage implements OnInit {

  sportNuggets: Sport[] = []
  activeSport: string = ''
  tabNum: number = 1;

  title =  "";
  description = "";
  location = ""; 
  city =  "";
  date = ""; 

  errorPop = false
  errorMsg: string = "Error"

  numPlayers = 2;
  ongoing = false;

  constructor(private router : Router, private matchService: MatchService) { 
  }

  selectTab(action: boolean){
    if(action){
      if(this.tabNum==1){
        if(this.activeSport == ""){
          this.errorMsg = "Please select a Sport."
          this.errorPop = true
        }else{
          this.tabNum += 1;          
        }        
      }
      else if(this.tabNum==2){
        if(this.city == "" || this.location == ""){
          this.errorMsg = "Please fill the all forms."
          this.errorPop = true
        }else{
          this.tabNum += 1;          
        } 
      }
      else if(this.tabNum==3){
        if(this.date == ""){
          this.errorMsg = "Please select a date."
          this.errorPop = true
        }else{
          this.tabNum += 1;          
        } 
      }     
    }else{
      this.tabNum -= 1;
    }
  }

  finishMatch(){
    if(this.title == "" || this.description == ""){
      this.errorMsg = "Please fill the all forms."
      this.errorPop = true
    }else{
      this.postMatch();
    }

  }


  selectSport(sportId: string){
    this.activeSport = sportId     
  }

  postMatch(){

    let newMatch: Object = {
      title :    this.title,
      description :   this.description,
      location :   this.location, 
      city :    this.city,
      date :  this.date, 
      sport :   this.activeSport,
      numPlayers: 2,
      ongoing: 1
    }
    
    this.matchService.newMatch(newMatch).subscribe(
      (response) => { 

      },
      err => {
        console.error('Error: status = ', err.status, ' and statusText = ', err.statusText)
        alert('Cannot fetch match users')
      },
      () => this.router.navigate(['/tabs/home'])); 

  }


  ngOnInit(): void {

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
      this.sportNuggets = sportsList;

  }

}
