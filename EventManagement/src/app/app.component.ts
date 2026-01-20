import { Component, ElementRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GlobalUserListComponent } from './Dialogs/global/global-userlist-dialog/global-user-list.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  //title = 'EventManagement';
  unlocked: boolean = false;

  // activityText = [
  //     'Test Activity 1',
  //     'Test Activity 2',
  //     'Test Activity 3'
  // ];


  constructor(private dialog: MatDialog, private elementRef: ElementRef) {} 


  ngOnInit() {

    //const iconElement = this.elementRef.nativeElement.querySelector('.mat-icon');
    //iconElement.classList.remove('mat-icon-no-color');

   
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
