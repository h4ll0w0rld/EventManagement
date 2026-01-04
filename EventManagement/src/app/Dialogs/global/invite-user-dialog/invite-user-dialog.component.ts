import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as ClipboardJS from 'clipboard';
import { EventService } from 'src/app/core/features/events/event.service';
import { ConfigService } from 'src/app/Services/config.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-invite-user-dialog',
  templateUrl: './invite-user-dialog.component.html',
  styleUrls: ['./invite-user-dialog.component.scss']
})
export class InviteUserDialogComponent {


  link = "";
  clipboard: ClipboardJS | undefined;
  buttonText = "Kopieren";

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private eventService: EventService, private configService: ConfigService, private location: Location) {

    this.createInviteLink("maxi");

  }


  createInviteLink(_fName: string) {
    console.log()
    if (this.eventService.currentEvent != null)
      this.link = `${window.location.host}/#/inviteLanding/${this.eventService.currentEvent.id}/${this.data.user.id}/${this.data.user.fName}/${this.data.user.lName}`;
  }

  copyToClipboard() {

    if (this.clipboard) {
      this.clipboard.destroy();
    }
    this.clipboard = new ClipboardJS('.copy-button', {
      text: () => this.link
    });

    this.clipboard.on('success', () => {

      this.buttonText = "Kopiert!";
      this.clipboard?.destroy();
    });

    this.clipboard.on('error', (e) => {
      alert("Wird nicht unterstützt");
    })
  }
}
