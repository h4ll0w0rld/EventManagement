import { Component } from '@angular/core';
import { ShiftplanService } from './Services/Shiftplan Service/shiftplan.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { GlobalUserListComponent } from './global-userlist-dialog/global-user-list.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'EventManagement';
  unlocked: boolean = false;

  activityText = [
      'Test Activity 1',
      'Test Activity 2',
      'Test Activity 3'
  ];


  constructor(public shiftplanService: ShiftplanService, private dialog: MatDialog) {} 


  ngOnInit() {

    this.shiftplanService.editmode$.subscribe(value => {
      this.unlocked = value;
    })
  }


  globalUserlist() {

    let dialogRef = this.dialog.open(GlobalUserListComponent,
      {
        /*data: {
          allUsers: this.shiftplanService.getAllUser()
        },*/
        width: '95vh',
        height: 'auto',
      }

    );
  }
}
