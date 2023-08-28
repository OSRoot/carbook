import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TesrPage } from './tesr.page';

const routes: Routes = [
  {
    path: '',
    component: TesrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TesrPageRoutingModule {}
