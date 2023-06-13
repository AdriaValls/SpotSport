import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatchCardComponent } from './match-card.component'
import { IonicModule } from '@ionic/angular'

@NgModule({
  declarations: [MatchCardComponent],
  imports: [CommonModule,IonicModule],
  exports: [MatchCardComponent],
  entryComponents: [MatchCardComponent],
})
export class MatchCardModule { }