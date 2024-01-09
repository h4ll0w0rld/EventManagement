import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { Activity } from 'src/app/Object Models/Shiftplan Component/activityModel';
import { User } from 'src/app/Object Models/user/user';
import { ShiftplanService } from 'src/app/Services/Shiftplan Service/shiftplan.service';
import { MatDialog } from '@angular/material/dialog';
import { UserListComponent } from 'src/app/Dialogs/shiftplan/user-list-dialog/user-list.component';
import { EventServiceService } from 'src/app/Services/Event Service/event-service.service';
import { Observable, map, switchMap } from 'rxjs';


@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent {

  @Input() activity = new Activity(1, new User(-1, "server", "dc", "", ""), "test");
  @Input() shiftId = 1;
  @Input() catId = -1;

  currUserAvailable: any;

  constructor(public shiftplanService: ShiftplanService, public eventService:EventServiceService, private dialog: MatDialog, private renderer: Renderer2, private el: ElementRef) {
    // currUserAvailable$.subscribe(userInArray => {
    //   if (!userInArray) {
        
    //   } else {
    //     console.log("jap, ", eventService.loggedInUser.fName, " is verfügbar");
    //   }
    // })
  }

  ngOnInit() {

    // this.eventService.getAvailableUser(this.shiftId, this.activity.uuid);

    // this.eventService.availableUser.subscribe((users: User[]) => {
    //   this.currUserAvailable = users;
    // });
  }


  openUserList() {
    const dialogRef = this.dialog.open(UserListComponent,
      {
        data: {
          activity: this.activity,
          shiftId: this.shiftId
        },
        width: '80vw',
        height: 'auto',
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);

    })

  }

}
