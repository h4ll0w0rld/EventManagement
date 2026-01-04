import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ShiftplanService } from '../../../core/features/shiftplan/shiftplan.service';
import { User } from '../../../Object Models/user/user';
import { EventService } from 'src/app/core/features/events/event.service';
import { DashboardService } from 'src/app/core/features/dashboard/dashboard.service';
import { BehaviorSubject } from 'rxjs';
import { CategoryContent } from 'src/app/Object Models/Shiftplan Component/category-content';


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
    public eventService: EventService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private matDialogRef: MatDialogRef<UserListComponent>
  ) {
    this.currUserId = eventService.loggedInUser.id;
  }


  ngOnInit() {
    console.log("Dialog data received:", this.data);
   
     this.eventService.getAvailableUsers(this.data.shiftId, this.data.activity.uuid);

    // Subscribe to the BehaviorSubject
    this.eventService.availableUsers$.subscribe(users => {
      this.userList = users.filter(user => user.id !== this.eventService.loggedInUser.id);
      console.log("Fetched Available Users: ", this.userList);
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

    this.eventService.regUserForActivity(_activityId, _userId).subscribe((res) => {
      this.onClose();
    });

  }

  addCurrUser(_activityId: number, _userId: number, _shiftId: number) {

    // this.eventService.regUserForActivity(_activityId, this.eventService.loggedInUser.id).subscribe((res) => {
    //   this.dashboardService.accReq(_activityId, this.eventService.currCat.id, this.eventService.loggedInUser.id);
    //   this.onClose();
    // })
  }

  delUser() {

    // this.eventService.delUserFromActivity(this.data.activity.uuid, this.data.activity.user.uuid, this.data.shiftId);
    // this.matDialogRef.close();

  }

  onClose() {

    const bool = true;
    this.matDialogRef.close(true);
    this.eventService.updateCategories();
  }

}
