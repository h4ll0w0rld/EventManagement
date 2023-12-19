import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/Auth Service/auth.service';
import { Router } from '@angular/router';


 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private authService:AuthService, private router: Router){}
  user = {
    email: "",
    pass: ""

  }

  onSubmit(){
    console.log(this.validateInput(this.user.email))
    this.authService.loginUser(this.user.email, this.user.pass);
    this.router.navigate(['/'])

  }

  validateInput(_mail: string){
    const pattern = /^[^@]+@[^@]+\.[^@]+$/;
    if (_mail&& !pattern.test(_mail)) {
      return { 'invalidEmail': true };
    }
    
    return null;
  }


}
