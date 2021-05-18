import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Auth } from 'aws-amplify';
import { AuthSignInError } from 'src/app/core/constants/auth-login-errors';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  hasError: boolean;
  errorMessage: string;
  loginForm: FormGroup;
  isLoading: boolean;

  constructor(private router: Router, private authService: AuthService) {

  }

  ngOnInit(): void {
    this.errorMessage = "";
    this.hasError = false;
    this.isLoading = false;
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onLogIn(): void {
    if (this.loginForm.invalid) return;

    let username = this.loginForm.get('email').value;
    let password = this.loginForm.get('password').value;

    this.isLoading = true;
    this.hasError = false;
    this.loginForm.disable();
    this.authService.setUserDetails(username, password);
    this.authService.signIn(username, password)
      .then(res => {
        this.authService.goToNextStep();
      })
      .catch((err: { code: AuthSignInError, message: string }) => {
        this.loginForm.enable();
        this.handleSignInError(err.code, err.message);
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  get disableButton(): boolean {
    return this.loginForm.invalid || this.isLoading;
  }

  handleSignInError(code: AuthSignInError, message: string): void {
    console.log(code, message)
    switch (code) {
      case AuthSignInError.UserNotConfirmed:
        this.router.navigate(['/auth/email-confirmation']);
        break;
      case AuthSignInError.NotAuthorized:
        this.errorMessage = message;
        break;
      default:
        this.errorMessage = "An unexpected error occurred."
        break
    }
    this.hasError = true;
  }
}
