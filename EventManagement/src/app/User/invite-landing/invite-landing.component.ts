import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { EventService } from 'src/app/core/features/events/event.service';
import { User } from 'src/app/Object Models/user/user';

@Component({
  selector: 'app-invite-landing',
  templateUrl: './invite-landing.component.html',
  styleUrls: ['./invite-landing.component.scss']
})
export class InviteLandingComponent implements OnInit {

  eventId!: number;
  inviteToken: string | null = null;
  userId: number | null = null;
  isLoggedIn: User | null = null;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private eventService: EventService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  // 1. Store invite token
  this.route.queryParams.subscribe(qp => {
    const token = qp['token'];
    const userId = qp['userId'];
    console.log("InviteLanding initialized with token:", token, "and userId:", userId);
    if (token) {
      localStorage.setItem('pendingInviteToken', token);
      localStorage.setItem('userId', userId.toString());
    }
  });

  // 2. Watch auth state
  this.authService.user$.subscribe(user => {
    console.log("what is happening here: ", !!user)
    this.isLoggedIn = user;
  });
}

acceptInvite() {
  const token = localStorage.getItem('pendingInviteToken');
  const userId = localStorage.getItem('userId');
  console.log("User ID from storage:", userId, "User from authService:", this.authService.user$, "");
  if (!token || !this.isLoggedIn) return;
  console.log("Accepting invite with token:", token);
  this.eventService.acceptInvite(token, this.isLoggedIn.id).subscribe({
    next: () => {
      localStorage.removeItem('pendingInviteToken');
      console.log("Invite accepted, navigating to home.");
      this.router.navigate(['/']);
    },
    error: err => console.error(err)
  });
}


}
