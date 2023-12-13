import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/Auth Service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private authService: AuthService) { }

  firstPass = "";
  secPass = "";
  user = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "NilsTest!"

  }

  onSubmitt() {
    this.checkPassword()
    if (this.checkPassword()) this.authService.registerUser(
      this.user.firstName,
      this.user.lastName,
      this.user.emailAddress,
      this.user.password
    );

  }

  checkPassword(): boolean {

    if (this.firstPass.length > 8 && this.secPass.length > 8)
      if (this.firstPass === this.secPass) return true

    return false;

  }
}
