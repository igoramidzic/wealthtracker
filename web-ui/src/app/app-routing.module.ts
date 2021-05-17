import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PAGE_ROUTES_CONSTANTS } from './core/constants/page-routes';
import { UnauthGuard } from './core/guards/unauth/unauth.guard';
import { AuthGuard } from './core/guards/auth/auth.guard';
import { OnboardingIncompleteGuard } from './core/guards/onboarding-incomplete/onboarding-incomplete.guard';
import { OnboardingCompleteGuard } from './core/guards/onboarding-complete/onboarding-complete.guard';
import { OopsGuard } from './core/guards/oops/oops.guard';
import { UserGuard } from './core/guards/user/user.guard';
import { AccountsModule } from './features/accounts/accounts.module';

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
                path: PAGE_ROUTES_CONSTANTS.ACCOUNTS,
                loadChildren: () => import('./features/accounts/accounts.module').then(m => m.AccountsModule)
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
