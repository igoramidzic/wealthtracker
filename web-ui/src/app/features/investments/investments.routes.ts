import { Routes } from '@angular/router';
import { InvestmentsComponent } from './investments.component';
import { InvestmentsPageComponent } from './pages/investments-page/investments-page.component';

export const INVESTMENTS_ROUTES: Routes = [
  {
    path: '',
    component: InvestmentsComponent,
    children: [
      {
        path: '',
        component: InvestmentsPageComponent
      }
    ]
  }
];
