import { Component, Input } from '@angular/core';
import { Activity } from 'src/app/Object Models/Shiftplan Component/activityModel';
import { User } from 'src/app/Object Models/user/shiftplanModel';
import { ShiftplanService } from 'src/app/Services/Shiftplan Service/shiftplan.service';
import { MatDialog } from '@angular/material/dialog';
import { UserListComponent } from 'src/app/user-list/user-list.component';


@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent {

  @Input() activity = new Activity(1, new User(1,"server","dc"), true);
  
  constructor(public shiftplanService: ShiftplanService, private dialog: MatDialog) {

   
  }


  openUserList() {
    this.dialog.open(UserListComponent,
      {
        data: this.activity,
        width: '95vh',
        height: '70vh'
        
      }
      
      );

  }

}
