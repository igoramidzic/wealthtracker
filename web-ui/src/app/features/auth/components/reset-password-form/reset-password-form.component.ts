import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { AuthResetPasswordError } from '../../../../core/constants/auth-reset-password-errors';
import { AuthSendCodeError } from 'src/app/core/constants/auth-send-code-errors';

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.scss']
})
export class ResetPasswordFormComponent implements OnInit {

  resendCodeInterval = 60;

  errorMessage: string;
  hasError: boolean;
  isLoading: boolean;
  passwordResetForm: FormGroup;
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
    this.passwordResetForm = new FormGroup({
      code: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  }

  onResetPassword(): void {
    if (this.passwordResetForm.invalid) return;

    this.resetErrors();

    let code = this.passwordResetForm.get('code').value;
    let password = this.passwordResetForm.get('password').value;

    this.passwordResetForm.disable();
    this.isLoading = true;

    this.authService.resetPassword(code, password)
      .then(res => {
        this.authService.goToNextStep();
      })
      .catch((err: { code: AuthResetPasswordError, message: string }) => {
        this.passwordResetForm.enable();
        this.handleConfirmSignUpError(err.code, err.message);
      })
      .finally(() => {
        this.passwordResetForm.enable();
        this.isLoading = false;
      });
  }

  resetErrors(): void {
    this.errorMessage = "";
    this.hasError = false;
  }

  handleConfirmSignUpError(code: AuthResetPasswordError, message: string): void {
    switch (code) {
      case AuthResetPasswordError.CodeMismatch:
        this.errorMessage = message;
        break;
      default:
        this.errorMessage = "An unexpected error occurred."
    }

    this.hasError = true;
  }

  onResendCode(): void {
    this.resendingCode = true;

    this.authService.sendResetPasswordCode()
      .then(res => {
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
    return this.passwordResetForm.invalid || this.isLoading;
  }

  get disableResendButton(): boolean {
    return this.resendCounterSeconds > 0;
  }
}
