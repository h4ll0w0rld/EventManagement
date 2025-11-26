import { Component } from '@angular/core';
import { EventServiceService } from '../Services/Event Service/event-service.service';
import { User } from '../Object Models/user/user';
import { DashboardService } from '../Services/Dashboard Service/dashboard.service';
import { MatDialog } from '@angular/material/dialog';
import { AddUserFormComponent } from '../Dialogs/global/add-user-form/add-user-form.component';
import { InviteUserDialogComponent } from '../Dialogs/global/invite-user-dialog/invite-user-dialog.component';

@Component({
  selector: 'app-userlist2',
  templateUrl: './userlist2.component.html',
  styleUrls: ['./userlist2.component.scss']
})
export class Userlist2Component {
  userList: User[] = [];
 

  constructor(public eventService: EventServiceService, public dashboardService: DashboardService, private dialog: MatDialog) { }
  ngOnInit() {

    this.eventService.allUser.subscribe((users: User[]) => {
      this.userList = users;
     // console.log(this.userList, "are the users populated ?");
    });

    this.eventService.getAllUser();
  }

  test(user: User) {
    console.log(this.userList, "is the user list populated ?");
    console.log(this.eventService.getRoles(), "are the roles populated!!!! ?");
    this.getRole(user);
    this.openInviteDialog(user);

  }

  getRole(user:User): void {
    console.log(user, "which user ?");
    const role = this.eventService.userIsAdmin(user).subscribe((isAdmin: boolean) => {
      user.isAdmin = isAdmin;
      console.log(user.isAdmin, "is Admin ?");
    });
    console.log(user.isAdmin, "is Admin ?");
    //return role ? role : 'Kein Role zugewiesen';
  }

   openUserDialog() {
    this.dialog.open(AddUserFormComponent, {
      width: '300px',
      
    });
  }

  openInviteDialog(user:User) {
    this.dialog.open(InviteUserDialogComponent, {
      width: '300px',
      data: { user}
    });
  }



}
