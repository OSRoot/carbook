import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExposDetailPage } from './expos-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ExposDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExposDetailPageRoutingModule {}
