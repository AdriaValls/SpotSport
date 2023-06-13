import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateMatchPageRoutingModule } from './create-match-routing.module';

import { CreateMatchPage } from './create-match.page';
import { HeaderModule } from 'src/app/components/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateMatchPageRoutingModule,
    HeaderModule     
  ],
  declarations: [CreateMatchPage]
})
export class CreateMatchPageModule {}
