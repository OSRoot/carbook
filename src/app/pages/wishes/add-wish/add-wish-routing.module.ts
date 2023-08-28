import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddWishPage } from './add-wish.page';

const routes: Routes = [
  {
    path: '',
    component: AddWishPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddWishPageRoutingModule {}
