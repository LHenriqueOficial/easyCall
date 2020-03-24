import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AbrirOsPagePage } from './abrir-os-page.page';

const routes: Routes = [
  {
    path: '',
    component: AbrirOsPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AbrirOsPagePageRoutingModule {}
