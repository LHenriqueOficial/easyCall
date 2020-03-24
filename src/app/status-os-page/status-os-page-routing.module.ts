import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatusOsPagePage } from './status-os-page.page';

const routes: Routes = [
  {
    path: '',
    component: StatusOsPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatusOsPagePageRoutingModule {}
