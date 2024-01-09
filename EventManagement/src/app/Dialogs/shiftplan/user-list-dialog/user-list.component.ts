import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ShiftplanService } from '../../../Services/Shiftplan Service/shiftplan.service';
import { User } from '../../../Object Models/user/user';
import { EventServiceService } from 'src/app/Services/Event Service/event-service.service';
import { Subscription, interval, switchMap } from 'rxjs';



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

  selectedUser = 'Kunibert Gloebe';
  currUserId: any;
 

  userList: User[] = [];

  
  constructor(
    public shiftplanService: ShiftplanService, 
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private matDialogRef: MatDialogRef<UserListComponent>, private eventService: EventServiceService) { 
      this.currUserId = eventService.loggedInUser.uuid;
    }


  ngOnInit() {

    if (!this.data.activity.user.uuid) {
      console.log(this.data, "DATAAA")
      this.eventService.getAvailableUser(this.data.shiftId, this.data.activity.uuid);
    }
    
    this.eventService.availableUser.subscribe((users: User[]) => {
      this.userList = users;
    });

    

  }

  ngOnDestroy() {

    this.matDialogRef.close();

    this.eventService.updateCategories()
  }


  onSelect(name: string): void {
    this.selectedUser = name;
  }

  reqUser(_activityId: number, _userId: number, _shiftId:number) {
 
    this.eventService.regUserForActivity(_activityId, _userId, _shiftId);
    this.onClose();
  }

  addCurrUser() {
    this.eventService.addUserToActivity(this.data.activity.uuid, this.eventService.loggedInUser.uuid, this.data.shiftId);
  }

  delUser() {
    
    this.eventService.delUserFromActivity(this.data.activity.uuid, this.data.activity.user.uuid, this.data.shiftId );
    this.matDialogRef.close();

  }

  onClose() {

    const bool = true;
    console.log("test beim schließen des Dialogs");
    this.matDialogRef.close(true);
    this.eventService.updateCategories();
  }


}
