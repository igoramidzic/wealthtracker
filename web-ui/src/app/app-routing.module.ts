import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PAGE_ROUTES_CONSTANTS } from './core/constants/page-routes';
import { UnauthGuard } from './core/guards/unauth/unauth.guard';
import { AuthGuard } from './core/guards/auth/auth.guard';
import { OnboardingIncompleteGuard } from './core/guards/onboarding-incomplete/onboarding-incomplete.guard';
import { OnboardingCompleteGuard } from './core/guards/onboarding-complete/onboarding-complete.guard';
import { OopsGuard } from './core/guards/oops/oops.guard';
import { UserGuard } from './core/guards/user/user.guard';
import { ContentLayoutComponent } from './shared/layouts/content-layout/content-layout.component';

const routes: Routes = [
  {
    path: PAGE_ROUTES_CONSTANTS.AUTH,
    canActivate: [UnauthGuard],
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'oops',
    canActivate: [OopsGuard],
    loadChildren: () => import('./features/oops/oops.module').then(m => m.OopsModule)
  },
  {
    path: '',
    component: ContentLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivate: [UserGuard],
        children: [
          {
            path: PAGE_ROUTES_CONSTANTS.ONBOARDING,
            canActivate: [OnboardingIncompleteGuard],
            loadChildren: () => import('./features/onboarding/onboarding.module').then(m => m.OnboardingModule)
          },
          {
            path: '',
            canActivate: [OnboardingCompleteGuard],
            children: [
              {
                path: '',
                pathMatch: 'full',
                redirectTo: PAGE_ROUTES_CONSTANTS.DASHBOARD,
              },
              {
                path: PAGE_ROUTES_CONSTANTS.DASHBOARD,
                loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)
              },
              {
                path: PAGE_ROUTES_CONSTANTS.INVESTMENTS,
                loadChildren: () => import('./features/investments/investments.module').then(m => m.InvestmentsModule)
              },
              {
                path: PAGE_ROUTES_CONSTANTS.RETIREMENT,
                loadChildren: () => import('./features/retirement/retirement.module').then(m => m.RetirementModule)
              },
              {
                path: PAGE_ROUTES_CONSTANTS.SETTINGS,
                loadChildren: () => import('./features/settings/settings.module').then(m => m.SettingsModule)
              }
            ]
          },
        ]
      }
    ]
  },
  {
    path: '**',
    redirectTo: PAGE_ROUTES_CONSTANTS.DASHBOARD,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
