import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DisponibilidadePage } from './disponibilidade.page';

const routes: Routes = [
  {
    path: '',
    component: DisponibilidadePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DisponibilidadePageRoutingModule {}
