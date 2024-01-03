import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/Services/Auth Service/auth.service';
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
  
  constructor(private authService:AuthService, private router: Router, private route: ActivatedRoute){}
  user = {
    email: "",
    pass: ""

  }

  onSubmit(){
    console.log(this.validateInput(this.user.email))
    this.authService.loginUser(this.user.email, this.user.pass)
    .subscribe(res => {

      if (this.authService.routeFromInviteLanding) {
        this.authService.routeFromInviteLanding = false;
        this.router.navigate(['/inviteLanding', this.eventId, this.userId, this.fName, this.lName]);
      }else {
        this.router.navigate(['/'])
      }
    })

    
    

  }

  validateInput(_mail: string){
    const pattern = /^[^@]+@[^@]+\.[^@]+$/;
    if (_mail&& !pattern.test(_mail)) {
      return { 'invalidEmail': true };
    }
    
    return null;
  }


}
