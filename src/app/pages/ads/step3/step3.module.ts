import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Step3PageRoutingModule } from './step3-routing.module';
import { Step3Page } from './step3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Step3PageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [Step3Page],
})
export class Step3PageModule {}
