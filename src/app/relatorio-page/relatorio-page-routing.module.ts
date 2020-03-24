import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RelatorioPagePage } from './relatorio-page.page';

const routes: Routes = [
  {
    path: '',
    component: RelatorioPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RelatorioPagePageRoutingModule {}
