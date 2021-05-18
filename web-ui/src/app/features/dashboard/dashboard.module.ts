import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DASHBOARD_ROUTES } from './dashboard.routes';
import { DashboardComponent } from './dashboard.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccountsListViewComponent } from './components/accounts-list-view/accounts-list-view.component';

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardPageComponent,
    AccountsListViewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(DASHBOARD_ROUTES),
  ],
  exports: [
  ],
  providers: [],
})
export class DashboardModule { }
