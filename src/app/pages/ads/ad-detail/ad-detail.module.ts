import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AdDetailPageRoutingModule } from './ad-detail-routing.module';
import { AdDetailPage } from './ad-detail.page';
import { register } from 'swiper/element/bundle';
register();
@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, AdDetailPageRoutingModule],
  declarations: [AdDetailPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdDetailPageModule {}
