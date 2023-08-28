import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './gurds/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
  {
    path: 'expos',
    loadChildren: () =>
      import('./expos/expos.module').then((m) => m.ExposPageModule),
  },
  {
    path: 'my-ads',
    loadChildren: () =>
      import('./my-ads/my-ads.module').then((m) => m.MyAdsPageModule),
  },
  {
    path: 'wishes',
    loadChildren: () =>
      import('./wishes/wishes.module').then((m) => m.WishesPageModule),
  },
  {
    path: 'tabs',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'step1',
    loadChildren: () =>
      import('./pages/ads/step1/step1.module').then((m) => m.Step1PageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'step2',
    loadChildren: () =>
      import('./pages/ads/step2/step2.module').then((m) => m.Step2PageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'details-step',
    loadChildren: () =>
      import('./pages/ads/details-step/details-step.module').then(
        (m) => m.DetailsStepPageModule
      ),
    canLoad: [AuthGuard],
  },
  {
    path: 'step3',
    loadChildren: () =>
      import('./pages/ads/step3/step3.module').then((m) => m.Step3PageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'add-wish',
    loadChildren: () =>
      import('./pages/wishes/add-wish/add-wish.module').then(
        (m) => m.AddWishPageModule
      ),
    canLoad: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/auth/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./pages/auth/signup/signup.module').then(
        (m) => m.SignupPageModule
      ),
  },
  {
    path: 'welcome',
    loadChildren: () =>
      import('./welcome/welcome.module').then((m) => m.WelcomePageModule),
  },
  {
    path: 'tesr',
    loadChildren: () =>
      import('./tesr/tesr.module').then((m) => m.TesrPageModule),
  },
  {
    path: 'expos-detail/:id',
    loadChildren: () =>
      import('./pages/expos-detail/expos-detail.module').then(
        (m) => m.ExposDetailPageModule
      ),
  },
  {
    path: 'ad-detail/:id',
    loadChildren: () =>
      import('./pages/ads/ad-detail/ad-detail.module').then(
        (m) => m.AdDetailPageModule
      ),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./pages/profile/profile.module').then((m) => m.ProfilePageModule),
    canLoad: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
