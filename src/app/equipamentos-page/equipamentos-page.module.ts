import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EquipamentosPagePageRoutingModule } from './equipamentos-page-routing.module';

import { EquipamentosPagePage } from './equipamentos-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EquipamentosPagePageRoutingModule
  ],
  declarations: [EquipamentosPagePage]
})
export class EquipamentosPagePageModule {}
