import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RelatorioOrdemPageRoutingModule } from './relatorio-ordem-routing.module';

import { RelatorioOrdemPage } from './relatorio-ordem.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RelatorioOrdemPageRoutingModule
  ],
  declarations: [RelatorioOrdemPage]
})
export class RelatorioOrdemPageModule {}
