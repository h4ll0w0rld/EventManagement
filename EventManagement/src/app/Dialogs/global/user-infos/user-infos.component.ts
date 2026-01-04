import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { EventService } from 'src/app/core/features/events/event.service';
import { InviteUserDialogComponent } from '../invite-user-dialog/invite-user-dialog.component';
import { DelUserDialogComponent } from '../del-user-dialog/del-user-dialog.component';

@Component({
  selector: 'app-user-infos',
  templateUrl: './user-infos.component.html',
  styleUrls: ['./user-infos.component.scss']
})
export class UserInfosComponent {


constructor(private eventService: EventService,  @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog) {}




  toAdmin() {

    console.log("die User Id is: ", this.data.user.id , localStorage.getItem('user'));
    this.eventService.makeUserToAdmin(this.data.user.id);
  }

  inviteToClaim() {

    let dialogRef = this.dialog.open(InviteUserDialogComponent,
      {
        data: {
          user: this.data.user
        },
        width: '90vw',
        height: 'auto',
      }
    );

    dialogRef.afterClosed().subscribe(result => {

      this.eventService.getAllUsers();
    })
  }

  delUserDialog() {

    let dialogRef = this.dialog.open(DelUserDialogComponent,
      {
        data: {
          user: this.data.user,
          message: "Möchtest du " + this.data.user.fName + "" + this.data.user.lName + " wirklich aus dem Event entfernen?"
        },
        width: '70%',
        height: 'auto',
      }
    );

    dialogRef.afterClosed().subscribe(result => {

      if (result === "deleted") {

        this.dialog.closeAll();
      }
      this.eventService.getAllUsers();
    })
  }

}
