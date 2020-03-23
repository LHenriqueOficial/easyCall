import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicialPagePageRoutingModule } from './inicial-page-routing.module';

import { InicialPagePage } from './inicial-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicialPagePageRoutingModule
  ],
  declarations: [InicialPagePage]
})
export class InicialPagePageModule {}
