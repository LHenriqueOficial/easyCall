import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenssagemPagePageRoutingModule } from './menssagem-page-routing.module';

import { MenssagemPagePage } from './menssagem-page.page';
import { ChatBubbleComponent } from '../chat-bubble/chat-bubble.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenssagemPagePageRoutingModule
  ],
  declarations: [MenssagemPagePage ,ChatBubbleComponent]
})
export class MenssagemPagePageModule {}
