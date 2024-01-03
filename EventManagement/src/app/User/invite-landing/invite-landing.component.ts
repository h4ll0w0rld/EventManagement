import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Object Models/user/user';
import { AuthService } from 'src/app/Services/Auth Service/auth.service';
import { EventServiceService } from 'src/app/Services/Event Service/event-service.service';

@Component({
  selector: 'app-invite-landing',
  templateUrl: './invite-landing.component.html',
  styleUrls: ['./invite-landing.component.scss']
})
export class InviteLandingComponent {

  eventId: number | undefined;
  userId: number | undefined;
  fName: string | undefined;
  lName: string | undefined;

  constructor(private router: Router, private route: ActivatedRoute, private eventService: EventServiceService, private authService: AuthService) {

  }


  ngOnInit(): void {

    this.route.params.subscribe(params => {

      this.eventId = params['eventId'];
      this.userId = params['userId'];
      this.fName = params['fName'];
      this.lName = params['lName'];
    })

    console.log("user ausm storage: ", localStorage.getItem('user'));

    if (localStorage.getItem('user') == null) {

      this.authService.routeFromInviteLanding = true;
      console.log(this.eventId, this.userId, this.fName, this.lName);
      this.router.navigate(['/authLanding', this.eventId, this.userId, this.fName, this.lName]);
    }
  }

  claimUserAndJoin() {

    if(this.eventId != undefined && this.userId != undefined && this.fName != undefined && this.lName != undefined) {
      
      console.log("die geb ich jz weiter: ", this.userId, this.fName, this.lName);
      this.eventService.claimUserInEvent(this.eventId, this.userId, this.fName, this.lName);
    }
    
  }

}
