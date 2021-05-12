import { Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { EmailConfirmationPageComponent } from './pages/email-confirmation-page/email-confirmation-page.component';
import { EmailConfirmationAuthedGuard } from 'src/app/core/guards/email-confirmation-authed/email-confirmation-authed.guard';
import { ResetPasswordPageComponent } from './pages/reset-password-page/reset-password-page.component';
import { SuccessfulSignoutPageComponent } from './pages/successful-signout-page/successful-signout-page.component';

export const LOGIN_ROUTES: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login'
      },
      {
        path: 'login',
        component: LoginPageComponent
      },
      {
        path: 'register',
        component: RegisterPageComponent
      },
      {
        path: 'email-confirmation',
        component: EmailConfirmationPageComponent,
        canActivate: [EmailConfirmationAuthedGuard]
      },
      {
        path: 'reset-password',
        component: ResetPasswordPageComponent
      },
      {
        path: 'successful-signout',
        component: SuccessfulSignoutPageComponent
      }
    ]
  }
];
