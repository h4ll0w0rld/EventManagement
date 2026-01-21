import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { catchError, of } from 'rxjs';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @Output() registerSuccess = new EventEmitter<{ email: string; password: string }>();

  buttonText = 'Registrieren';
  animationState = false;

  // -------------------------
  // FORM DATA
  // -------------------------
  user = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: ''
  };

  firstPass = '';
  secPass = '';

  // -------------------------
  // ERROR STATE
  // -------------------------
  backendError: string | null = null;

  // Keep reference to email control
  private emailModel!: NgModel;

  constructor(private authService: AuthService) {}

  // -------------------------
  // SUBMIT
  // -------------------------
  onSubmit() {
    this.backendError = null;

    if (this.passwordInvalid) return;

    this.user.password = this.firstPass;

    this.authService
      .registerUser(
        this.user.firstName,
        this.user.lastName,
        this.user.emailAddress,
        this.user.password
      )
      .pipe(
        catchError(err => {
          if (err?.status === 409) {
            // Mark email field as invalid
            this.emailModel.control.setErrors({ emailTaken: true });
            this.emailModel.control.markAsTouched();
            this.emailModel.control.markAsDirty();
          } else {
            this.backendError =
              err?.error?.message || 'Registrierung fehlgeschlagen';
          }
          return of(null);
        })
      )
      .subscribe(res => {
        if (!res) return;
        this.successTransition();
      });
  }

  // -------------------------
  // EMAIL HANDLING
  // -------------------------
  setEmailModel(model: NgModel) {
    this.emailModel = model;
  }

  onEmailChange(model: NgModel) {
    this.emailModel = model;

    if (model.errors?.['emailTaken']) {
      model.control.setErrors(null);
    }
  }

  // -------------------------
  // PASSWORD VALIDATION
  // -------------------------
  get passwordTooShort(): boolean {
    return this.firstPass.length > 0 && this.firstPass.length < 8;
  }

  get passwordsDoNotMatch(): boolean {
    return this.secPass.length > 0 && this.firstPass !== this.secPass;
  }

  get passwordInvalid(): boolean {
    return this.passwordTooShort || this.passwordsDoNotMatch;
  }

  onSecondPasswordChange(model: NgModel) {
    model.control.setErrors(null);

    if (this.firstPass.length > 0 && this.firstPass.length < 8) {
      model.control.setErrors({ tooShort: true });
      return;
    }

    if (this.secPass && this.firstPass !== this.secPass) {
      model.control.setErrors({ mismatch: true });
    }
  }

  // -------------------------
  // SUCCESS
  // -------------------------
  successTransition() {
    this.animationState = true;
    this.buttonText = 'Registriert!';

    setTimeout(() => {
      this.registerSuccess.emit({
        email: this.user.emailAddress,
        password: this.firstPass
      });

      this.resetForm();
    }, 2000);
  }

  // -------------------------
  // RESET
  // -------------------------
  resetForm() {
    this.animationState = false;
    this.buttonText = 'Registrieren';

    this.user = {
      firstName: '',
      lastName: '',
      emailAddress: '',
      password: ''
    };

    this.firstPass = '';
    this.secPass = '';
    this.backendError = null;
  }
}
