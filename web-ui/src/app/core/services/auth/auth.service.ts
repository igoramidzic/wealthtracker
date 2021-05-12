import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';
import { ISignUpResult } from 'src/app/core/constants/signupresult';
import { Router } from '@angular/router';
import { AuthSignInError } from '../../constants/auth-login-errors';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _nextStep: AuthNextStep;

  private _userDetails: {
    name?: string;
    email?: string;
    password?: string;
  }

  get userDetails(): {
    readonly name?: string,
    readonly email?: string,
    readonly password?: string
  } {
    return {
      name: this._userDetails.name,
      email: this._userDetails.email,
      password: this._userDetails.password,
    }
  }

  get nextStep(): AuthNextStep { return this._nextStep; }

  constructor(private router: Router) {
    this._userDetails = {
      email: localStorage.getItem('signin_email') || null
    }

    this._nextStep = <AuthNextStep>localStorage.getItem('auth_next_step') || null;
  }

  goToNextStep(): void {
    switch (this._nextStep) {
      case AuthNextStep.None:
        this.router.navigate(['/']);
        break;
      case AuthNextStep.Done:
        this.attemptToSignInAfterEmailConfirmation();
        break;
      case AuthNextStep.ConfirmEmail:
        this.router.navigate(['/auth/email-confirmation']);
        break;
      case AuthNextStep.ResetPassword:
        this.router.navigate(['/auth/reset-password']);
        break;
      default:
        this.router.navigate(['/']);
    }
  }

  private async attemptToSignInAfterEmailConfirmation(): Promise<void> {
    if (!this.userDetails.password) {
      this.router.navigate(['/auth/login']);
      return;
    }

    try {
      await Auth.signIn(this.userDetails.email, this.userDetails.password);
      this.router.navigate(['/'])
    } catch (e) {
      this.router.navigate(['/auth/login']);
    }
  }

  async signUp(name: string, email: string, password: string): Promise<ISignUpResult> {
    this.setUserDetails(email, password, name);
    this.setNextStep(AuthNextStep.Beginning);

    try {
      let signUpResult = await Auth.signUp({
        username: email,
        password,
        attributes: {
          name
        }
      });

      if (signUpResult.userConfirmed) this.setNextStep(AuthNextStep.Done);
      else this.setNextStep(AuthNextStep.ConfirmEmail);

      return signUpResult;
    } catch (err) {
      throw err;
    }
  }

  async signIn(email: string, password: string): Promise<any> {
    this.setUserDetails(email, password);

    try {
      let signInResult = await Auth.signIn(email, password);
      this.setNextStep(AuthNextStep.None);

      return signInResult;
    } catch (err) {
      this.handleSignInFailure(err);
      throw err;
    }
  }

  handleSignInFailure(err: { code: AuthSignInError, message: string }): void {
    switch (err.code) {
      case AuthSignInError.PasswordResetRequired:
        this.sendResetPasswordCode();
        this.setNextStep(AuthNextStep.ResetPassword)
        this.goToNextStep();
        break;
      case AuthSignInError.UserNotConfirmed:
        this.setNextStep(AuthNextStep.ConfirmEmail);
        this.goToNextStep();
        break;
      default:
        throw err;
    }
  }

  async sendResetPasswordCode(): Promise<any> {
    if (!this.userDetails.email) throw Error("Email is empty");

    try {
      let res = await Auth.forgotPassword(this.userDetails.email);
      return res;
    } catch (e) {
      throw e;
    }
  }

  async resetPassword(code: string, password: string): Promise<any> {
    try {
      let res = await Auth.forgotPasswordSubmit(this.userDetails.email, code, password);

      this.setNextStep(AuthNextStep.Done);

      return res;
    } catch (e) {
      throw e;
    }
  }

  async confirmEmail(code: string): Promise<any> {
    try {
      let confirmRes = await Auth.confirmSignUp(this.userDetails.email, code);
      this.setNextStep(AuthNextStep.Done);

      return confirmRes;
    } catch (err) {

      throw err;
    }
  }

  setNextStep(nextStep: AuthNextStep): void {
    this._nextStep = nextStep;
    localStorage.setItem("auth_next_step", nextStep);
  }

  setUserDetails(email: string, password: string, name?: string): void {
    localStorage.setItem("signin_email", email);
    this._userDetails = {
      email,
      password,
      name
    }
  }

  async signOut(): Promise<void> {
    await Auth.signOut();
    this.router.navigate(['/auth/successful-signout']);
  }
}

export enum AuthCurrentState {
  ConfirmEmail = "confirm_email",
  AuthAfterConfirmEmail = "authenticate_after_confirm_email",
  NeedsAuthentication = "needs_authenticate",
  Authenticated = "authenticated"
}

export enum AuthNextStep {
  Beginning = "beginning",
  ConfirmEmail = "confirm_email",
  ResetPassword = "reset_password",
  Done = "done",
  None = "none"
}
