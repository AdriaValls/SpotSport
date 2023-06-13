import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Match } from 'src/app/models/Match';

@Component({
  selector: 'app-match-card',
  templateUrl: './match-card.component.html',
  styleUrls: ['./match-card.component.scss'],
})
export class MatchCardComponent  implements OnInit {

  @Input() matchInfo!: Match
  @Output() goMatchEvent = new EventEmitter<number>();

  constructor(public router: Router, public route: ActivatedRoute) { 
    
  }
  ngOnInit() {}

  gotoMatch() {
    this.goMatchEvent.emit(this.matchInfo.id);
  }
}
