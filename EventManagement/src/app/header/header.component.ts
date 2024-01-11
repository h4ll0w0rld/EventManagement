import { Component } from '@angular/core';
import { ShiftplanService } from '../Services/Shiftplan Service/shiftplan.service';
import { MatDialog } from '@angular/material/dialog';
import { GlobalUserListComponent } from '../Dialogs/global/global-userlist-dialog/global-user-list.component';
import { EventServiceService } from '../Services/Event Service/event-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  title = 'Planit Events';
  unlocked: boolean = false;
  //isAdmin = false;



  constructor(public shiftplanService: ShiftplanService, private dialog: MatDialog, public eventService: EventServiceService) {

    this.eventService.getCurrentEvent().subscribe(event => {
      this.title = event.name
    })
    this.shiftplanService.editmode$.subscribe(value => {
      this.unlocked = value;
    })
    this.eventService.getRoles();
  }
 

  globalUserlist() {

    this.dialog.open(GlobalUserListComponent,
      {
        width: '80vw',
        height: 'auto',
      }

    );
  }
}
