import { Routes } from '@angular/router';
import { RetirementComponent } from './retirement.component';
import { RetirementPlannerPageComponent } from './pages/retirement-planner-page/retirement-planner-page.component';

export const RETIREMENT_ROUTES: Routes = [
  {
    path: '',
    component: RetirementComponent,
    children: [
      {
        path: '',
        redirectTo: 'planner',
        pathMatch: 'full'
      },
      {
        path: 'planner',
        component: RetirementPlannerPageComponent
      }
    ]
  }
];
