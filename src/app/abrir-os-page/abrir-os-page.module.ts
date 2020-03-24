import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AbrirOsPagePageRoutingModule } from './abrir-os-page-routing.module';

import { AbrirOsPagePage } from './abrir-os-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AbrirOsPagePageRoutingModule
  ],
  declarations: [AbrirOsPagePage]
})
export class AbrirOsPagePageModule {}
