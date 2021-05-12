import { Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmSignUpError } from 'src/app/core/constants/auth-confirm-signup-errors';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { AuthSendCodeError } from '../../../../core/constants/auth-send-code-errors';

@Component({
  selector: 'app-email-confirmation-form',
  templateUrl: './email-confirmation-form.component.html',
  styleUrls: ['./email-confirmation-form.component.scss']
})
export class EmailConfirmationFormComponent implements OnInit {

  resendCodeInterval = 60;

  errorMessage: string;
  hasError: boolean;
  isLoading: boolean;
  emailConfirmationForm: FormGroup;
  resendCounterSeconds: number;
  resendingCode: boolean;
  sendCodeLimitReached: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.errorMessage = "";
    this.hasError = false;
    this.isLoading = false;
    this.resendCounterSeconds = 0;
    this.resendingCode = false;
    this.sendCodeLimitReached = false;
    this.emailConfirmationForm = new FormGroup({
      code: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }

  onConfirmEmail(): void {
    if (this.emailConfirmationForm.invalid) return;

    this.resetErrors();

    let code = this.emailConfirmationForm.get('code').value;

    this.emailConfirmationForm.disable();
    this.isLoading = true;

    this.authService.confirmEmail(code)
      .then(res => {
        this.authService.goToNextStep();
      })
      .catch((err: { code: ConfirmSignUpError, message: string }) => {
        this.emailConfirmationForm.enable();
        this.handleConfirmSignUpError(err.code, err.message);
        this.isLoading = false;
      })
      .finally(() => {
        this.emailConfirmationForm.enable();
      });
  }

  resetErrors(): void {
    this.errorMessage = "";
    this.hasError = false;
  }

  handleConfirmSignUpError(code: ConfirmSignUpError, message: string): void {
    switch (code) {
      case ConfirmSignUpError.ExpiredCode:
        this.errorMessage = message;
        break;
      case ConfirmSignUpError.CodeMismatch:
        this.errorMessage = message;
        break;
      default:
        this.errorMessage = "An unexpected error occurred.";
        break;
    }

    this.hasError = true;
  }

  onResendCode(): void {
    this.resendingCode = true;

    Auth.resendSignUp(this.authService.userDetails.email)
      .then(res => {
        (res)
        this.startResendCodeTimer();
      })
      .catch(err => {
        this.handleResendCodeError(err.code, err.message);
      })
      .finally(() => {
        this.resendingCode = false;
      })
  }

  handleResendCodeError(code: AuthSendCodeError, message: string): void {
    switch (code) {
      case AuthSendCodeError.LimitExceeded:
        this.sendCodeLimitReached = true;
        break;
      default:
        break;
    }
  }

  startResendCodeTimer(): void {
    this.resendCounterSeconds = this.resendCodeInterval;
    var this2 = this;
    let timer = setInterval(() => {
      this2.resendCounterSeconds--;
      if (this2.resendCounterSeconds == 0) clearInterval(timer);
    }, 1000);
  }

  get disableButton(): boolean {
    return this.emailConfirmationForm.invalid || this.isLoading;
  }

  get disableResendButton(): boolean {
    return this.resendCounterSeconds > 0 || this.resendingCode;
  }
}
