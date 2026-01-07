import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../Object Models/user/user';
import { EventService } from '../core/features/events/event.service';
import { AddUserFormComponent } from '../Dialogs/global/add-user-form/add-user-form.component';
import { InviteUserDialogComponent } from '../Dialogs/global/invite-user-dialog/invite-user-dialog.component';

@Component({
  selector: 'app-userlist2',
  templateUrl: './userlist2.component.html',
  styleUrls: ['./userlist2.component.scss']
})
export class Userlist2Component implements OnInit {

  userList: User[] = [];
  openedUser: User | null = null;

  constructor(
    public eventService: EventService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.eventService.allUser$.subscribe(users => {
      this.userList = users;
    });

    this.eventService.getAllUsers();
  }

  toggleUser(user: User): void {
    this.openedUser = this.openedUser === user ? null : user;

    if (!user.isAdmin) {
      this.eventService.userIsAdmin(user).subscribe(isAdmin => {
        user.isAdmin = isAdmin;
      });
    }
  }

  makeAdmin(user: User): void {
    console.log('Make admin clicked for', user);
    // backend call here later
    this.eventService.makeUserToAdmin(user.id)
  
    // For now, just toggle the isAdmin property
    user.isAdmin = true;
  }

  inviteUser(user: User) {
  console.log('Invite user:', user);
  const dialogRef = this.dialog.open(InviteUserDialogComponent, {
    data: { user: user }
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The invite dialog was closed');
  });
  // later: open invite dialog
}

}
