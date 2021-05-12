import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LOGIN_ROUTES } from './auth.routes';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { EmailConfirmationPageComponent } from './pages/email-confirmation-page/email-confirmation-page.component';
import { EmailConfirmationFormComponent } from './components/email-confirmation-form/email-confirmation-form.component';
import { ResetPasswordPageComponent } from './pages/reset-password-page/reset-password-page.component';
import { ResetPasswordFormComponent } from './components/reset-password-form/reset-password-form.component';
import { SuccessfulSignoutPageComponent } from './pages/successful-signout-page/successful-signout-page.component';

@NgModule({
  declarations: [
    AuthComponent,
    LoginPageComponent,
    RegisterPageComponent,
    LoginFormComponent,
    RegisterFormComponent,
    EmailConfirmationPageComponent,
    EmailConfirmationFormComponent,
    ResetPasswordPageComponent,
    ResetPasswordFormComponent,
    SuccessfulSignoutPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(LOGIN_ROUTES),
  ],
  exports: [
  ],
  providers: [],
})
export class AuthModule { }
