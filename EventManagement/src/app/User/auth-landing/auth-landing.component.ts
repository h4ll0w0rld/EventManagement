import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { EventService } from 'src/app/core/features/events/event.service';

@Component({
  selector: 'app-auth-landing',
  templateUrl: './auth-landing.component.html',
  styleUrls: ['./auth-landing.component.scss'],
})
export class AuthLandingComponent implements OnInit {

  @ViewChild('tabGroup') tabGroup!: MatTabGroup;

  registeredUser: { email: string, password: string } | null = null;

  eventId!: number;
  inviteToken!: string | null;
  userId!: number | null;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private eventService: EventService
  ) {}

  ngOnInit(): void {

    this.eventId = +this.route.snapshot.params['eventId'];

    // this.route.queryParams.subscribe(qp => {
    //   this.inviteToken = qp['token'] || null;
    //   this.userId = qp['userId'] || null;


    //   if (this.inviteToken) {
    //     localStorage.setItem('pendingInviteToken', this.inviteToken);
    //   }
    //   if (this.userId) {
    //     localStorage.setItem('userId', this.userId.toString());
    //   }
    // });

    // // Wait for login success
    // this.authService.user$.subscribe(user => {
    //   if (user && this.inviteToken) {
    //     this.acceptInvite();
    //   }
    // });
  }

  handleRegister(data: { email: string, password: string }) {
    this.registeredUser = data;
    this.tabGroup.selectedIndex = 0;
  }

  // acceptInvite() {
  //   const token = localStorage.getItem('pendingInviteToken');
  //   const userId = localStorage.getItem('userId');
  //   if (!token || !userId) return;
  //   this.eventService.claimUserInEvent(this.eventId, +userId)
  //   this.eventService.acceptInvite(token).subscribe({
  //     next: () => {
  //       localStorage.removeItem('pendingInviteToken');
  //       this.router.navigate(['/']);
  //     },
  //     error: err => console.error('Invite accept failed', err)
  //   });
  // }

  switchToLogin() {
    this.tabGroup.selectedIndex = 0;
  }
}
