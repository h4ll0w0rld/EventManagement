import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ShiftplanService } from '../../../Services/Shiftplan Service/shiftplan.service';
import { User } from '../../../Object Models/user/user';
import { EventServiceService } from 'src/app/Services/Event Service/event-service.service';
import { DashboardService } from 'src/app/Services/Dashboard Service/dashboard.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {

  currUserId: any;
  userList: User[] = [];

  constructor(
    public shiftplanService: ShiftplanService,
    public dashboardService: DashboardService,
    public eventService: EventServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private matDialogRef: MatDialogRef<UserListComponent>
  ) {
    this.currUserId = eventService.loggedInUser.id;
  }


  ngOnInit() {
    
    this.eventService.getAvailableUser(this.data.shiftId, this.data.activity.uuid);
    console.log("Available Users for Activity ID ", this.data.activity.id, " and Shift ID ", this.data.shiftId);

    this.eventService.availableUser.subscribe((users: User[]) => {
      this.userList = users;
      console.log("Fetched Available Users: ", this.userList);
      if (this.isCurrUserInList()) {
        console.log("Current user is in the available user list, removing self from display.");
        this.userList = this.userList.filter(user => user.id !== this.eventService.loggedInUser.id)
      }
    });
  }

  ngOnDestroy() {

    this.matDialogRef.close();
    this.eventService.updateCategories()
  }

  isCurrUserInList() {

    return this.userList.some(user => user.id === this.eventService.loggedInUser.id);
  }

  reqUser(_activityId: number, _userId: number, _shiftId: number) {

    this.eventService.regUserForActivity(_activityId, _userId, _shiftId, false).subscribe((res) => {
      this.onClose();
    });

  }

  addCurrUser(_activityId: number, _userId: number, _shiftId: number) {

    this.eventService.regUserForActivity(_activityId, this.eventService.loggedInUser.id, _shiftId, true).subscribe((res) => {
      this.dashboardService.accReq(_activityId, this.eventService.currCat.id, this.eventService.loggedInUser.id);
      this.onClose();
    })
  }

  delUser() {

    this.eventService.delUserFromActivity(this.data.activity.uuid, this.data.activity.user.uuid, this.data.shiftId);
    this.matDialogRef.close();

  }

  onClose() {

    const bool = true;
    this.matDialogRef.close(true);
    this.eventService.updateCategories();
  }

}
