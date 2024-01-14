import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EventServiceService } from 'src/app/Services/Event Service/event-service.service';

@Component({
  selector: 'app-delete-shift-dialog',
  templateUrl: './delete-shift-dialog.component.html',
  styleUrls: ['./delete-shift-dialog.component.scss']
})
export class DeleteShiftDialogComponent {


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private eventService: EventServiceService, private dialog: DialogRef) {}


  deleteShift() {

    this.eventService.deleteShift(this.data._catId, this.data._shift.id);
    this.dialog.close();
  }

}
