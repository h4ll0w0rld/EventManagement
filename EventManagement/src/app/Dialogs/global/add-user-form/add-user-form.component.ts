import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EventService } from 'src/app/core/features/events/event.service';

@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.scss']
})
export class AddUserFormComponent {

  fName: string = '';
  lName: string = '';

  constructor(
    private eventService: EventService,
    private matDialogRef: MatDialogRef<AddUserFormComponent>
      
  ) { console.log("AddUserFormComponent initialized");
}

  addNewUser(): void {
    console.log("AddUserFormComponent: Adding new user", this.fName, this.lName);
    if (!this.fName || !this.lName) return;

    this.eventService.addUnregUser(this.fName, this.lName);

    // Refresh user list (because backend does not return the new user)
    this.eventService.getAllUsers();

    // Close dialog
    //this.matDialogRef.close();
  }

}
