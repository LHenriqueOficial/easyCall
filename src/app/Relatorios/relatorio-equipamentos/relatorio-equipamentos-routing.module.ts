import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RelatorioEquipamentosPage } from './relatorio-equipamentos.page';

const routes: Routes = [
  {
    path: '',
    component: RelatorioEquipamentosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RelatorioEquipamentosPageRoutingModule {}
