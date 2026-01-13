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
  errorMessage: string | null = null;
  loading = false;
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
    this.errorMessage = null;
    this.loading = true;

    this.authService.login(this.user.email, this.user.pass).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: err => {
        this.loading = false;

        if (err.status === 401 || err.status === 400) {
          this.errorMessage = 'E-Mail oder Passwort ist falsch.';
        } else {
          this.errorMessage = 'E-Mail oder Passwort ist falsch.';
        }
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
