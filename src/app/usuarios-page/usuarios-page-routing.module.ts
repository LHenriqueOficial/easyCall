import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuariosPagePage } from './usuarios-page.page';

const routes: Routes = [
  {
    path: '',
    component: UsuariosPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosPagePageRoutingModule {}
