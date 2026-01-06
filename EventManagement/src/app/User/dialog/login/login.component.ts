import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  @Input() eventId: number | undefined;
  @Input() userId: number | undefined;
  @Input() fName: string | undefined;
  @Input() lName: string | undefined;
  @Input() set autoFill(data: { email: string, password: string } | null) {
  if (data) {
    this.user.email = data.email;
    this.user.pass = data.password;
  }
}

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }
  user = {
    email: "",
    pass: ""

  }

  onSubmit() {
    console.log("Login attempt with", this.user.email, this.user.pass);
    console.log(this.validateInput(this.user.email))
    this.authService.login(this.user.email, this.user.pass)
      .subscribe({
        next: (user) => {
          console.log("Login success:", user);
          this.router.navigate(['/']);
        },
        error: err => {
          console.error("Login failed", err);
        }
      });


  }

  validateInput(_mail: string) {
    const pattern = /^[^@]+@[^@]+\.[^@]+$/;
    if (_mail && !pattern.test(_mail)) {
      return { 'invalidEmail': true };
    }

    return null;
  }


}
