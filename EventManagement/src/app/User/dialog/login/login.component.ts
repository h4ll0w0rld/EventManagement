import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/Auth Service/auth.service';


 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private authService:AuthService){}
  user = {
    email: "",
    pass: ""

  }

  onSubmitt(){
    console.log(this.validateInput(this.user.email))
    this.authService.loginUser(this.user.email, this.user.pass);

  }

  validateInput(_mail: string){
    const pattern = /^[^@]+@[^@]+\.[^@]+$/;
    if (_mail&& !pattern.test(_mail)) {
      return { 'invalidEmail': true };
    }
    
    return null;
  }


}
