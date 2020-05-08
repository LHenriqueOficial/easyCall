import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RelatorioOrdemPage } from './relatorio-ordem.page';

const routes: Routes = [
  {
    path: '',
    component: RelatorioOrdemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RelatorioOrdemPageRoutingModule {}
