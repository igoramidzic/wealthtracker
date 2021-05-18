import { Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { AccountsPageComponent } from './pages/accounts-page/accounts-page.component';
import { GeneralSettingsPageComponent } from './pages/general-settings-page/general-settings-page.component';
import { SecurityPageComponent } from './pages/security-page/security-page.component';

export const SETTINGS_ROUTES: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'general'
      },
      {
        path: 'general',
        component: GeneralSettingsPageComponent,
      },
      {
        path: 'accounts',
        component: AccountsPageComponent,
      },
      {
        path: 'security',
        component: SecurityPageComponent,
      }
    ]
  }
];
