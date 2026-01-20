import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DashboardService } from '../../../core/features/dashboard/dashboard.service';
import { User } from '../../../Object Models/user/user';
import { DelUserDialogComponent } from '../del-user-dialog/del-user-dialog.component';
import { AddUserFormComponent } from '../add-user-form/add-user-form.component';
import { EventService } from 'src/app/core/features/events/event.service';
import { UserInfosComponent } from '../user-infos/user-infos.component';

@Component({
  selector: 'app-global-user-list',
  templateUrl: './global-user-list.component.html',
  styleUrls: ['./global-user-list.component.scss']
})
export class GlobalUserListComponent {

  globalUserlist: User[] = [];

  constructor(public dashboardService: DashboardService, public eventService: EventService, @Inject(MAT_DIALOG_DATA) public data: any, 
  private dialog: MatDialog) {}

  ngOnInit() {

    this.eventService.allUser$.subscribe(value => {
      this.globalUserlist = value;
    })

    this.eventService.getAllUsers();
  }

  newUserDialog() {

    let dialogRef = this.dialog.open(AddUserFormComponent,
      {
        width: '90vw',
        height: 'auto',
      }
    );

    dialogRef.afterClosed().subscribe(result => {

      this.eventService.getAllUsers();
    })
      
  }

  delUserDialog(_user: any) {

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
      this.eventService.getAllUsers();
    })
  }

  

  openInfos(_user: any) {

    let dialogRef = this.dialog.open(UserInfosComponent,
      {
        data: {
          user: _user
        },
        width: '90vw',
        height: 'auto'

      }
    );
  }
}
