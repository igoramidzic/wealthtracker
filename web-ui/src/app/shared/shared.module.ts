import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { MainNavbarComponent } from './components/navbar/main-navbar/main-navbar.component';
import { ProgressBarComponent } from './components/loaders/progress-bar/progress-bar.component';
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import { AddAccountButtonComponent } from './components/accounts/add-account-button/add-account-button.component';
import { NotificationBarComponent } from './components/notifications/notification-bar/notification-bar.component';
import { NgbAccordionModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { SideNavbarComponent } from './components/navbar/side-navbar/side-navbar.component';
import { ContentLayoutComponent } from './layouts/content-layout/content-layout.component';
import { RefreshAccountsButtonComponent } from './components/accounts/refresh-accounts-button/refresh-accounts-button.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ThousandSuffixesPipe } from '../core/pipes/currencySuffix.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSliderModule,
    AmplifyUIAngularModule,
    NgbAccordionModule,
    NgbCollapseModule,
    NgxChartsModule
  ],
  declarations: [
    MainNavbarComponent,
    ProgressBarComponent,
    AddAccountButtonComponent,
    NotificationBarComponent,
    SideNavbarComponent,
    ContentLayoutComponent,
    RefreshAccountsButtonComponent,
    ThousandSuffixesPipe
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MainNavbarComponent,
    ProgressBarComponent,
    NgxSliderModule,
    AmplifyUIAngularModule,
    AddAccountButtonComponent,
    NotificationBarComponent,
    NgbAccordionModule,
    NgbCollapseModule,
    SideNavbarComponent,
    RefreshAccountsButtonComponent,
    NgxChartsModule,
    ThousandSuffixesPipe
  ],
})
export class SharedModule { }
