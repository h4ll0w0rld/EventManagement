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
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private matDialogRef: MatDialogRef<UserListComponent>) { }


  ngOnInit() {
    this.shiftplanService.getAvailableUser(1, this.data.activity.uuid);
    this.shiftplanService.availableUser.subscribe((users: User[]) => {
      this.userList = users;
    });

  }

  ngOnDestroy() {

    this.matDialogRef.close();
  }


  onSelect(name: string): void {
    this.selectedUser = name;
  }

  addUser(_activityId: number, _userId: number, _shiftId:number) {
 
    this.shiftplanService.addUserToActivity(_activityId, _userId, _shiftId);
    this.matDialogRef.close();
  }

  delUser() {
    
    this.shiftplanService.delUserFromActivity(this.data.activity.uuid, this.data.activity.user.uuid, this.data.shiftId );
    this.matDialogRef.close();

  }


}
