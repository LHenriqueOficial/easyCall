import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SetorPagePageRoutingModule } from './setor-page-routing.module';

import { SetorPagePage } from './setor-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SetorPagePageRoutingModule
  ],
  declarations: [SetorPagePage]
})
export class SetorPagePageModule {}
