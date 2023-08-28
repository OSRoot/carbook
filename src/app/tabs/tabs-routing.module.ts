import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'expos',
        loadChildren: () =>
          import('../expos/expos.module').then((m) => m.ExposPageModule),
      },
      {
        path: 'my-ads',
        loadChildren: () =>
          import('../my-ads/my-ads.module').then((m) => m.MyAdsPageModule),
      },
      {
        path: 'wishes',
        loadChildren: () =>
          import('../wishes/wishes.module').then((m) => m.WishesPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
