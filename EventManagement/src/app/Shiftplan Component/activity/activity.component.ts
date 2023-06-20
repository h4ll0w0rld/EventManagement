import { Component, Input } from '@angular/core';
import { Activity } from 'src/app/Object Models/Shiftplan Component/activityModel';
import { User } from 'src/app/Object Models/user/user';
import { ShiftplanService } from 'src/app/Services/Shiftplan Service/shiftplan.service';
import { MatDialog } from '@angular/material/dialog';
import { UserListComponent } from 'src/app/Dialogs/shiftplan/user-list-dialog/user-list.component';


@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent {

  @Input() activity = new Activity(1, new User(1, "server", "dc"), true);
  @Input() shiftId = 1;

  constructor(public shiftplanService: ShiftplanService, private dialog: MatDialog) {


  }


  openUserList() {
    let dialogRef = this.dialog.open(UserListComponent,
      {
        data: {activity: this.activity, 
              shiftId: this.shiftId},
        width: '95vh',
        height: 'auto',
      }

    );
    //dialogRef.afterClosed().subscribe(result => { })

  }

}
