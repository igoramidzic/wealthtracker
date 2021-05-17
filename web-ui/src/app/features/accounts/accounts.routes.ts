import { Routes } from '@angular/router';
import { AccountsComponent } from './accounts.component';
import { AccountsPageComponent } from './pages/accounts-page/accounts-page.component';

export const ACCOUNTS_ROUTES: Routes = [
  {
    path: '',
    component: AccountsComponent,
    children: [
      {
        path: '',
        component: AccountsPageComponent,
      }
    ]
  }
];
