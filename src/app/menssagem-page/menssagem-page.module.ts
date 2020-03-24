import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenssagemPagePageRoutingModule } from './menssagem-page-routing.module';

import { MenssagemPagePage } from './menssagem-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenssagemPagePageRoutingModule
  ],
  declarations: [MenssagemPagePage]
})
export class MenssagemPagePageModule {}
