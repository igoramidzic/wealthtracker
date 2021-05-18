import { Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { AccountsPageComponent } from './pages/accounts-page/accounts-page.component';

export const SETTINGS_ROUTES: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'accounts'
      },
      {
        path: 'accounts',
        component: AccountsPageComponent,
      }
    ]
  }
];
