import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DisponibilidadePageRoutingModule } from './disponibilidade-routing.module';

import { DisponibilidadePage } from './disponibilidade.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DisponibilidadePageRoutingModule
  ],
  declarations: [DisponibilidadePage]
})
export class DisponibilidadePageModule {}
