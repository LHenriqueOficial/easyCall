import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RelatorioOrdensPage } from './relatorio-ordens.page';

const routes: Routes = [
  {
    path: '',
    component: RelatorioOrdensPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RelatorioOrdensPageRoutingModule {}
