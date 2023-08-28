import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsStepPage } from './details-step.page';

const routes: Routes = [
  {
    path: '',
    component: DetailsStepPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsStepPageRoutingModule {}
