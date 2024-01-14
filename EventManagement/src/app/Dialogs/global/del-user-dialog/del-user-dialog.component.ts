import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GlobalUserListComponent } from '../global-userlist-dialog/global-user-list.component';
import { ShiftplanService } from '../../../Services/Shiftplan Service/shiftplan.service';
import { User } from '../../../Object Models/user/user';
import { EventServiceService } from 'src/app/Services/Event Service/event-service.service';

@Component({
  selector: 'app-del-user-dialog',
  templateUrl: './del-user-dialog.component.html',
  styleUrls: ['./del-user-dialog.component.scss']
})
export class DelUserDialogComponent {

  message = "";

  constructor(public eventService: EventServiceService, @Inject(MAT_DIALOG_DATA) public data: any, private matDialogRef: MatDialogRef<GlobalUserListComponent>) {
    this.message = data.message;
  }


  deleteUser(_user: User) {

    this.eventService.removeUserFromEvent(_user.uuid).subscribe((res) => {
      this.message = "Erfolgreich aus dem Event entfernt!"
    })

    setTimeout(() => {
      this.matDialogRef.close('deleted');
    }, 2000);
    
    
  }
}
