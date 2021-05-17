import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ACCOUNTS_ROUTES } from './accounts.routes';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccountsComponent } from './accounts.component';
import { AccountsPageComponent } from './pages/accounts-page/accounts-page.component';
import { AccountItemListComponent } from './components/account-item-list/account-item-list.component';
import { ErrorLoadingAccountsComponent } from './components/error-loading-accounts/error-loading-accounts.component';
import { EmptyAccountsListComponent } from './components/empty-accounts-list/empty-accounts-list.component';

@NgModule({
  declarations: [
    AccountsComponent,
    AccountsPageComponent,
    AccountItemListComponent,
    ErrorLoadingAccountsComponent,
    EmptyAccountsListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(ACCOUNTS_ROUTES),
  ],
  exports: [
  ],
  providers: [],
})
export class AccountsModule { }
