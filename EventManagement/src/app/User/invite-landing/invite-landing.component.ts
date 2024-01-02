import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private route: ActivatedRoute) {}


  ngOnInit(): void {

    this.route.params.subscribe(params => {

      this.eventId = params['eventId'];
      this.userId = params['userId'];
      this.fName = params['fName'];
      this.lName = params['lName'];
    })
  }

}
