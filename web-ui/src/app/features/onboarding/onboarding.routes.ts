import { Routes } from '@angular/router';
import { OnboardingPageComponent } from './pages/onboarding-page/onboarding-page.component';
import { OnboardingComponent } from './onboarding.component';

export const ONBOARDING_ROUTES: Routes = [
  {
    path: '',
    component: OnboardingComponent,
    children: [
      {
        path: '',
        component: OnboardingPageComponent
      }
    ]
  }
];
