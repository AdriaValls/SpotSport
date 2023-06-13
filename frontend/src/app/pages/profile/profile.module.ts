import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';

import { HeaderModule } from 'src/app/components/header/header.module';
import { MatchCardModule } from 'src/app/components/match-card/match-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    HeaderModule,
    MatchCardModule 
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
