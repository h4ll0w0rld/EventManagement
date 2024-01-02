import { Component } from '@angular/core';
import { ShiftplanService } from '../../../Services/Shiftplan Service/shiftplan.service';
import { MatDialogRef } from '@angular/material/dialog';
import { EventServiceService } from 'src/app/Services/Event Service/event-service.service';

@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.scss']
})
export class AddUserFormComponent {

  fName: string = "";
  lName: string = "";

  constructor(public eventService: EventServiceService, private matDialogRef: MatDialogRef<AddUserFormComponent>) {

  }

  addNewUser() {

    this.eventService.addUnregUser(this.fName, this.lName);
    this.matDialogRef.close();

  }

}
