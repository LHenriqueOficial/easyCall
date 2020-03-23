import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastroPagePage } from './cadastro-page.page';

const routes: Routes = [
  {
    path: '',
    component: CadastroPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastroPagePageRoutingModule {}
