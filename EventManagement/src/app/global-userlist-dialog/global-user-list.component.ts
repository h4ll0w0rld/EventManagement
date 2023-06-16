import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DashboardService } from '../Services/Dashboard Service/dashboard.service';
import { User } from '../Object Models/user/user';
import { ShiftplanService } from '../Services/Shiftplan Service/shiftplan.service';
import { DelUserDialogComponent } from '../del-user-dialog/del-user-dialog.component';
import { SubmitDialogComponent } from '../submit-dialog/submit-dialog.component';
import { AddUserFormComponent } from '../add-user-form/add-user-form.component';

@Component({
  selector: 'app-global-user-list',
  templateUrl: './global-user-list.component.html',
  styleUrls: ['./global-user-list.component.scss']
})
export class GlobalUserListComponent {

  globalUserlist: User[] = [];

  constructor(public dashboardService: DashboardService, public shiftplanService: ShiftplanService, @Inject(MAT_DIALOG_DATA) public data: any, 
  private matDialogRef: MatDialogRef<GlobalUserListComponent>, private dialog: MatDialog) {}

  ngOnInit() {

    this.dashboardService.userList.subscribe(value => {
      this.globalUserlist = value;
    })

    this.dashboardService.getAllUser();
  }

  delUserDialog(_user: User) {

    let dialogRef = this.dialog.open(DelUserDialogComponent,
      {
        data: {
          user: _user,
          message: "Möchtest du " + _user.fName + "" + _user.lName + " wirklich aus dem Event entfernen?"
        },
        width: '70%',
        height: 'auto',
      }
    );

    dialogRef.afterClosed().subscribe(result => {

      console.log("huhuuuuu")
      this.dashboardService.getAllUser();
    })
  }

  newUserDialog() {

    let dialogRef = this.dialog.open(AddUserFormComponent,
      {
        width: '70%',
        height: 'auto',
      }
    );

    dialogRef.afterClosed().subscribe(result => {

      this.dashboardService.getAllUser();
    })
      
  }

}
