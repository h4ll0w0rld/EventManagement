import { Component, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth-landing',
  templateUrl: './auth-landing.component.html',
  styleUrls: ['./auth-landing.component.scss'],
  //encapsulation: ViewEncapsulation.None
})
export class AuthLandingComponent {
  
  @ViewChild('tabGroup') tabGroup!: MatTabGroup;

  eventId: number | undefined;
  userId: number | undefined;
  fName: string | undefined;
  lName: string | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {

    console.log("testle", this.eventId, this.userId);
    this.route.params.subscribe(params => {
      this.eventId = params['eventId'];
      this.userId = params['userId'];
      this.fName = params['fName'];
      this.lName = params['lName'];
    })

    console.log("testle", this.eventId, this.userId);
  }

  switchToLogin() {

    
    this.tabGroup.selectedIndex = 0;
  }
}
