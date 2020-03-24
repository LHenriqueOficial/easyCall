import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatusOsPagePageRoutingModule } from './status-os-page-routing.module';

import { StatusOsPagePage } from './status-os-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatusOsPagePageRoutingModule
  ],
  declarations: [StatusOsPagePage]
})
export class StatusOsPagePageModule {}
