import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GlobalUserListComponent } from '../global-userlist-dialog/global-user-list.component';
import { ShiftplanService } from '../Services/Shiftplan Service/shiftplan.service';
import { User } from '../Object Models/user/user';

@Component({
  selector: 'app-del-user-dialog',
  templateUrl: './del-user-dialog.component.html',
  styleUrls: ['./del-user-dialog.component.scss']
})
export class DelUserDialogComponent {

  constructor(public shiftplanService: ShiftplanService, @Inject(MAT_DIALOG_DATA) public data: any, private matDialogRef: MatDialogRef<GlobalUserListComponent>) {}


  deleteUser(_user: User) {

    this.shiftplanService.delUser(_user.uuid);
    this.matDialogRef.close();
  }
}
