import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import Amplify from "aws-amplify";
import awsconfig from "../aws-exports";
import { WealthTrackerApiHttpInterceptor } from './core/interceptors/wealthtracker_api.interceptor';

Amplify.configure(awsconfig);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: WealthTrackerApiHttpInterceptor, multi: true
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
