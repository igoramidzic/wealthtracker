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

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSliderModule,
    AmplifyUIAngularModule,
    NgbAccordionModule,
    NgbCollapseModule
  ],
  declarations: [
    MainNavbarComponent,
    ProgressBarComponent,
    AddAccountButtonComponent,
    NotificationBarComponent
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
    NgbCollapseModule
  ],
})
export class SharedModule { }
