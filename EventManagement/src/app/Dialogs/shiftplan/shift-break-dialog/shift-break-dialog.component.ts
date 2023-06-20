import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-shift-break-dialog',
  templateUrl: './shift-break-dialog.component.html',
  styleUrls: ['./shift-break-dialog.component.scss']
})
export class ShiftBreakDialogComponent {


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
  private matDialogRef: MatDialogRef<ShiftBreakDialogComponent>) {}


  shiftBreak() {


  }
}
