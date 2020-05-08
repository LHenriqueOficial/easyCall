import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RelatorioEquipamentosPageRoutingModule } from './relatorio-equipamentos-routing.module';

import { RelatorioEquipamentosPage } from './relatorio-equipamentos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RelatorioEquipamentosPageRoutingModule
  ],
  declarations: [RelatorioEquipamentosPage]
})
export class RelatorioEquipamentosPageModule {}
