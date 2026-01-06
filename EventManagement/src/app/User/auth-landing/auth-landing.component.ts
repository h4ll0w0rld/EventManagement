import { Component, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth-landing',
  templateUrl: './auth-landing.component.html',
  styleUrls: ['./auth-landing.component.scss'],
})

export class AuthLandingComponent {
  
  @ViewChild('tabGroup') tabGroup!: MatTabGroup;
  registeredUser: { email: string, password: string } | null = null;

  eventId: number | undefined;
  userId: number | undefined;
  fName: string | undefined;
  lName: string | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.eventId = params['eventId'];
      this.userId = params['userId'];
      this.fName = params['fName'];
      this.lName = params['lName'];
    })
  }
  handleRegister(data: { email: string, password: string }) {
  this.registeredUser = data;
  this.tabGroup.selectedIndex = 0; // switch to Login tab
}


  switchToLogin() {

    this.tabGroup.selectedIndex = 0;
  }
}
