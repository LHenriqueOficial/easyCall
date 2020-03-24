import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RelatorioPagePageRoutingModule } from './relatorio-page-routing.module';

import { RelatorioPagePage } from './relatorio-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RelatorioPagePageRoutingModule
  ],
  declarations: [RelatorioPagePage]
})
export class RelatorioPagePageModule {}
