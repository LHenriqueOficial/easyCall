import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OsManutencaopagePageRoutingModule } from './os-manutencaopage-routing.module';

import { OsManutencaopagePage } from './os-manutencaopage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OsManutencaopagePageRoutingModule
  ],
  declarations: [OsManutencaopagePage]
})
export class OsManutencaopagePageModule {}
