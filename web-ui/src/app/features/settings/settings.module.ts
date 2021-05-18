import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SETTINGS_ROUTES } from './settings.routes';
import { SharedModule } from 'src/app/shared/shared.module';
import { SettingsComponent } from './settings.component';
import { AccountsPageComponent } from './pages/accounts-page/accounts-page.component';
import { AccountItemListComponent } from './components/account-item-list/account-item-list.component';
import { ErrorLoadingAccountsComponent } from './components/error-loading-accounts/error-loading-accounts.component';
import { EmptyAccountsListComponent } from './components/empty-accounts-list/empty-accounts-list.component';
import { ItemDeleteButtonComponent } from './components/item-delete-button/item-delete-button.component';
import { SettingsMenuComponent } from './components/settings-menu/settings-menu.component';
import { SecurityPageComponent } from './pages/security-page/security-page.component';
import { GeneralSettingsPageComponent } from './pages/general-settings-page/general-settings-page.component';

@NgModule({
  declarations: [
    SettingsComponent,
    AccountsPageComponent,
    AccountItemListComponent,
    ErrorLoadingAccountsComponent,
    EmptyAccountsListComponent,
    ItemDeleteButtonComponent,
    SettingsMenuComponent,
    SecurityPageComponent,
    GeneralSettingsPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(SETTINGS_ROUTES),
  ],
  exports: [
  ],
  providers: [],
})
export class SettingsModule { }
