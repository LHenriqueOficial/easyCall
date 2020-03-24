import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenssagemPagePage } from './menssagem-page.page';

const routes: Routes = [
  {
    path: '',
    component: MenssagemPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenssagemPagePageRoutingModule {}
