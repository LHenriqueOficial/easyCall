import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetorPagePage } from './setor-page.page';

const routes: Routes = [
  {
    path: '',
    component: SetorPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetorPagePageRoutingModule {}
