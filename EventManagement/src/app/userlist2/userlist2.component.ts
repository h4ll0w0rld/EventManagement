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
  ) { }

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
  addUser() {
    const dialogRef = this.dialog.open(AddUserFormComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The add user dialog was closed');
    });
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
  removeUser(user: User): void {
    console.log('Remove user clicked for', user);
    this.eventService.removeUserFromEvent(user.id).subscribe(() => {
      // After successful removal, update the user list
      console.log('User removed from event:', user);
      this.userList = this.userList.filter(u => u.id !== user.id);
      if (this.openedUser === user) {
        this.openedUser = null; // Close the details view if the removed user was opened
      }
    });

  }

  removeAdmin(user: User): void {
    console.log('Remove admin clicked for', user);
    this.eventService.removeAdminRights(user.id).subscribe((res) => {
      console.log('Admin rights removed for', user);
      console.log(res);
    });

    // For now, just toggle the isAdmin property
    user.isAdmin = false;
  }

  toggleAdmin(person: any) {
    if (person.isAdmin) {
      this.removeAdmin(person);
    } else {
      this.makeAdmin(person);
    }
  }

  test(userId: any) {
    this.eventService.createInvite(userId ).subscribe({
      next: invite => console.log('Invite created:', invite),
      error: err => console.error(err)
    });
  }
}
