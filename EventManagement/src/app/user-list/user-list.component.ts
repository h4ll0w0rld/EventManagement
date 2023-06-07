import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Activity } from '../Object Models/Shiftplan Component/activityModel';
import { ShiftplanService } from '../Services/Shiftplan Service/shiftplan.service';
import { User } from '../Object Models/user/user';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  users = [
    'Kunibert Gloebe',
    'Harald Lichter',
    'Herbert Dunkler'
  ];

  // user = this.users;
  selectedUser = 'Kunibert Gloebe';
  //userList: User[] = [new User(1, "", "")];

  userList: User[] = [];

  constructor(
    public shiftplanService: ShiftplanService, 
    @Inject(MAT_DIALOG_DATA) public data: Activity, 
    private matDialogRef: MatDialogRef<UserListComponent>) { }


  ngOnInit() {
    this.shiftplanService.getAllUser();
    this.shiftplanService.userList.subscribe((users: User[]) => {
      this.userList = users;
    });

  }

  ngOnDestroy() {

    this.matDialogRef.close();
  }


  onSelect(name: string): void {
    this.selectedUser = name;
  }

  addUser(_activityId: number, _userId: number) {
    this.shiftplanService.addUserToActivity(_activityId, _userId);
    this.matDialogRef.close();
  }

  delUser() {

    this.shiftplanService.delUserFromActivity(this.data.uuid, this.data.user.uuid);
    this.matDialogRef.close();

  }


}
