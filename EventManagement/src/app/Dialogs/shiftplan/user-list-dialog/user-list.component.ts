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
  requestError: string | null = null;
  isSubmitting = false;
  hideSelfRegister = false;
  private errorTimer: any;



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

    if (this.data.activity.status === 'free') {
      this.eventService.getAvailableUsers(this.data.shiftId, this.data.activity.uuid);

      this.eventService.availableUsers$.subscribe(users => {
        this.userList = users.filter(user => user.id !== this.eventService.loggedInUser.id);
      });
    }
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
      this.eventService.triggerCategoryReload();

    });

  }

  addCurrUser(_activityId: number, _userId: number, _shiftId: number) {
    this.isSubmitting = true;
    this.requestError = null;

    this.eventService.regUserForActivity(_activityId, this.eventService.loggedInUser.id)
      .subscribe({
        next: () => {
          if (this.eventService.currentCategory)
            this.dashboardService.acceptRequest(
              _activityId,
              this.eventService.currentCategory.id,
              this.eventService.loggedInUser.id
            );

          this.onClose();
          this.eventService.triggerCategoryReload();
        },
        error: err => {
          this.isSubmitting = false;

          if (err.status === 400) {
            this.requestError = `${this.eventService.loggedInUser.fName} ist zu diesem Zeitpunkt schon verplant`;
            this.hideSelfRegister = true;

            clearTimeout(this.errorTimer);
            this.errorTimer = setTimeout(() => {
              this.requestError = null;
            }, 3500);
          }
        }
      });
  }

  delUser() {
    console.log("Removing user from activity:", this.data.activity.uuid);
    this.eventService.delUserFromActivity(this.data.activity.uuid).subscribe(res => {
      this.eventService.triggerCategoryReload();
    });   //, this.data.activity.user.uuid, this.data.shiftId
    this.matDialogRef.close();

  }

  onClose() {

    const bool = true;
    this.matDialogRef.close(true);
    this.eventService.updateCategories();
  }
  hasUser(): boolean {
    return this.data.activity.status == 'free';
  }

}
