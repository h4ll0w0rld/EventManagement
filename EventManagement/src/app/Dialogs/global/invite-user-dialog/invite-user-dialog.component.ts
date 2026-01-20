import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as ClipboardJS from 'clipboard';
import { EventService } from 'src/app/core/features/events/event.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-invite-user-dialog',
  templateUrl: './invite-user-dialog.component.html',
  styleUrls: ['./invite-user-dialog.component.scss']
})
export class InviteUserDialogComponent implements OnInit {

  link: string = '';
  inviteToken: string | null = null;
  clipboard?: ClipboardJS;
  buttonText = "Kopieren";

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, // data.user should exist
    private eventService: EventService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    if (!this.eventService.currentEvent?.id) return;

    const eventId = this.eventService.currentEvent.id;
    const userId = this.data.user.id;
    // Create invite token
    this.eventService.createInvite(userId).subscribe({
      next: (res: any) => {
        this.inviteToken = res.token;
        this.link = `${window.location.origin}/#/inviteLanding?token=${this.inviteToken}&userId=${userId}`;
      },
      error: err => console.error("Failed to create invite token", err)
    });
  }

  copyToClipboard(): void {
    if (!this.link) return;

    // iOS Safari fallback
    const textarea = document.createElement('textarea');
    textarea.value = this.link;

    // Prevent scrolling on iOS
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';

    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    try {
      const successful = document.execCommand('copy');
      if (successful) {
        this.buttonText = 'Kopiert!';
      } else {
        console.error('Copy command was unsuccessful');
      }
    } catch (err) {
      console.error('Copy failed', err);
    }

    document.body.removeChild(textarea);
  }


}
