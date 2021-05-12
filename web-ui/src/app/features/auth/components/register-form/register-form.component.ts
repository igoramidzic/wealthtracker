import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Auth } from 'aws-amplify';
import { AuthSignUpError } from 'src/app/core/constants/auth-signup-errors';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  hasError: boolean;
  errorMessage: string;
  registerForm: FormGroup;
  isLoading: boolean;

  @ViewChild('name') nameInput: ElementRef;
  @ViewChild('email') emailInput: ElementRef;
  @ViewChild('password') passwordInput: ElementRef;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.errorMessage = "";
    this.hasError = false;
    this.isLoading = false;
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  onRegister(): void {
    if (this.registerForm.invalid) return;

    let name = this.registerForm.get('name').value;
    let username = this.registerForm.get('email').value;
    let password = this.registerForm.get('password').value;

    this.authService.setUserDetails(username, password, name);

    this.isLoading = true;
    this.registerForm.disable();
    this.authService.signUp(name, username, password).then(res => {
      this.authService.goToNextStep();
    }).catch((err: { code: AuthSignUpError, message: string }) => {
      this.registerForm.enable();
      this.handleSignUpError(err.code, err.message)
    }).finally(() => {
      this.isLoading = false;
      this.registerForm.enable();
    });
  }

  get disableButton(): boolean {
    return this.registerForm.invalid || this.isLoading;
  }

  handleSignUpError(code: AuthSignUpError, message: string): void {
    switch (code) {
      case AuthSignUpError.UsernameExists:
        this.errorMessage = message;
        this.emailInput.nativeElement.focus();
        break;
      case AuthSignUpError.InvalidParameter:
        this.errorMessage = "Please enter a valid email."
        this.emailInput.nativeElement.focus();
        break;
      default:
        this.errorMessage = "An unexpected error occurred."
        break;
    }
    this.hasError = true;
  }

}
