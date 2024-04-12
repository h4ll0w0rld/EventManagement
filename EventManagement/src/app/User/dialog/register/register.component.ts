import { Component, ElementRef, EventEmitter, Output, Renderer2 } from '@angular/core';
import { AuthService } from 'src/app/Services/Auth Service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  @Output() registerSuccess: EventEmitter<void> = new EventEmitter<void>();

  buttonText = "Registrieren";
  animationState = false;

  constructor(private authService: AuthService, private el: ElementRef, private renderer: Renderer2) { }

  firstPass = "";
  secPass = "";
  user = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: ""

  }

  onSubmit() {

    //this.checkPassword()
    if (this.checkPassword()) this.authService.registerUser(
      this.user.firstName,
      this.user.lastName,
      this.user.emailAddress,
      this.user.password = this.firstPass

    ).subscribe((res) => {

      this.successTransition();
    });

  }

  checkPassword(): boolean {

    if (this.firstPass.length > 8 && this.secPass.length > 8)
      if (this.firstPass === this.secPass) return true

    return false;

  }

  successTransition() {

    const successDiv = this.el.nativeElement.querySelector('.' + "success");
    this.renderer.setStyle(successDiv, 'z-index', '1');
    this.animationState = true;
    this.buttonText = "Registriert!";

    setTimeout(() => {
      this.registerSuccess.emit();
      setTimeout(() => {
        this.animationState = false;}, 1000);
    }, 2000);
  }

  clearInputs() {

    this.user.firstName = "";
    this.user.lastName = "";
    this.user.emailAddress = "";
    this.user.password = "";
    
  }
}
