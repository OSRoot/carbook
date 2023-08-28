import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddWishPageRoutingModule } from './add-wish-routing.module';

import { AddWishPage } from './add-wish.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddWishPageRoutingModule
  ],
  declarations: [AddWishPage]
})
export class AddWishPageModule {}
