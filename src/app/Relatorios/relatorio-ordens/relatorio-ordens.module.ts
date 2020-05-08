import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RelatorioOrdensPageRoutingModule } from './relatorio-ordens-routing.module';

import { RelatorioOrdensPage } from './relatorio-ordens.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RelatorioOrdensPageRoutingModule
  ],
  declarations: [RelatorioOrdensPage]
})
export class RelatorioOrdensPageModule {}
