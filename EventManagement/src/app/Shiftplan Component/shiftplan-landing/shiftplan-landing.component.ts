import { Component, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalUserListComponent } from 'src/app/Dialogs/global/global-userlist-dialog/global-user-list.component';
import { ShiftplanService } from 'src/app/Services/Shiftplan Service/shiftplan.service';

@Component({
  selector: 'app-shiftplan-landing',
  templateUrl: './shiftplan-landing.component.html',
  styleUrls: ['./shiftplan-landing.component.scss']
})
export class ShiftplanLandingComponent {
  title = 'EventManagement';
  unlocked: boolean = false;

  activityText = [
      'Test Activity 1',
      'Test Activity 2',
      'Test Activity 3'
  ];


  constructor(public shiftplanService: ShiftplanService, private dialog: MatDialog, private elementRef: ElementRef) {} 


  ngOnInit() {

    const iconElement = this.elementRef.nativeElement.querySelector('.mat-icon');
    iconElement.classList.remove('mat-icon-no-color');

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
