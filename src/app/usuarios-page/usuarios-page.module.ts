import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuariosPagePageRoutingModule } from './usuarios-page-routing.module';

import { UsuariosPagePage } from './usuarios-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuariosPagePageRoutingModule
  ],
  declarations: [UsuariosPagePage]
})
export class UsuariosPagePageModule {}
