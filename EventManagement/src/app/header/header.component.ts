import { Component } from '@angular/core';
import { ShiftplanService } from '../Services/Shiftplan Service/shiftplan.service';
import { MatDialog } from '@angular/material/dialog';
import { GlobalUserListComponent } from '../Dialogs/global/global-userlist-dialog/global-user-list.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  title = 'Planit Events';
  unlocked: boolean = false;



  constructor(public shiftplanService: ShiftplanService, private dialog: MatDialog) {

    this.title = this.shiftplanService.event.name;
    this.shiftplanService.editmode$.subscribe(value => {
      this.unlocked = value;
    })
  }


  globalUserlist() {

    let dialogRef = this.dialog.open(GlobalUserListComponent,
      {
        width: '80vw',
        height: 'auto',
      }

    );
  }
}
