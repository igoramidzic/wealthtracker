import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { MainNavbarComponent } from './components/navbar/main-navbar/main-navbar.component';
import { ProgressBarComponent } from './components/loaders/progress-bar/progress-bar.component';
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { DividerModule } from 'primeng/divider';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSliderModule,
    AmplifyUIAngularModule,
    ButtonModule,
    InputTextModule,
    MessagesModule,
    MessageModule,
    DividerModule,
  ],
  declarations: [
    MainNavbarComponent,
    ProgressBarComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MainNavbarComponent,
    ProgressBarComponent,
    NgxSliderModule,
    AmplifyUIAngularModule,
    ButtonModule,
    InputTextModule,
    MessagesModule,
    MessageModule,
    DividerModule,
  ],
})
export class SharedModule { }
