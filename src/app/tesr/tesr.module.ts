import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TesrPageRoutingModule } from './tesr-routing.module';

import { TesrPage } from './tesr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TesrPageRoutingModule
  ],
  declarations: [TesrPage]
})
export class TesrPageModule {}
