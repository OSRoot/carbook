import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsStepPageRoutingModule } from './details-step-routing.module';

import { DetailsStepPage } from './details-step.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsStepPageRoutingModule
  ],
  declarations: [DetailsStepPage]
})
export class DetailsStepPageModule {}
