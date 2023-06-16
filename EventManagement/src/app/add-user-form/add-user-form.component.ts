import { Component } from '@angular/core';
import { ShiftplanService } from '../Services/Shiftplan Service/shiftplan.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.scss']
})
export class AddUserFormComponent {

  fName: string = "";
  lName: string = "";

  constructor(public shiftplanService: ShiftplanService, private matDialogRef: MatDialogRef<AddUserFormComponent>) {

  }

  addNewUser() {

    this.shiftplanService.addUser(this.fName, this.lName);
    this.matDialogRef.close();

  }

}
