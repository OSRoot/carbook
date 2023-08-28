import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExposDetailPageRoutingModule } from './expos-detail-routing.module';

import { ExposDetailPage } from './expos-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExposDetailPageRoutingModule
  ],
  declarations: [ExposDetailPage]
})
export class ExposDetailPageModule {}
