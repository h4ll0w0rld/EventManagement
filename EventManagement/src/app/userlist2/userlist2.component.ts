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

  constructor(
    public eventService: EventService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // Subscribe to the BehaviorSubject to automatically update the list
    this.eventService.allUser$.subscribe(users => {
      this.userList = users;
      console.log('User list updated:', this.userList);
    });

    // Fetch initial users for the current event
    this.eventService.getAllUsers();
  }

  /** Check and assign admin role to a user */
  getRole(user: User): void {
    this.eventService.userIsAdmin(user).subscribe(isAdmin => {
      user.isAdmin = isAdmin;
    });
  }

  /** Open dialog to add a new user */
  openUserDialog(): void {
    console.log('Opening Add User Dialog');
    const dialogRef = this.dialog.open(AddUserFormComponent, {
      width: '300px'
    });

    // No need to manually refresh users — AddUserFormComponent updates BehaviorSubject
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Dialog closed after adding user.');
      }
    });
  }

  /** Open dialog to invite a user */
  openInviteDialog(user: User): void {
    const dialogRef = this.dialog.open(InviteUserDialogComponent, {
      width: '300px',
      data: { user }
    });

    // No need to refresh manually — InviteUserDialogComponent should update BehaviorSubject
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     console.log('Dialog closed after inviting user.');
    //   }
    // });
  }

  /** For testing / debug purposes */
  test(user: User): void {
    console.log('Current user list:', this.userList);
    this.getRole(user);
    this.openInviteDialog(user);
  }
}
